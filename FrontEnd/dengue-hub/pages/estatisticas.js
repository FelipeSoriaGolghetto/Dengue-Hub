import { useState, useEffect } from "react";
import Navbar from "../components/navbar";

export default function Home() {
  const [fields, setFields] = useState([
    { id: 1, option: "tipo", value: "", isFixed: true },
    { id: 2, option: "inicio", value: "", isFixed: true },
    { id: 3, option: "final", value: "", isFixed: true },
  ]);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState("");
  const [helpText, setHelpText] = useState("");

  const fixedOptions = [
    { value: "tipo", label: "Tipo", description: 'tipo=1: Visita a Imóveis: imóveis trabalhados, fechados e pendencia tipo=2: Visita a Imóveis: imóveis trabalhados, fechados e tratamentos \n tipo=3: Agentes: semana, dias, imóveis trabalhados, fechados e positivos \n tipo=4: Visitas: imóveis trabalhados, fechados, positivos e tratamentos \n tipo=5: Controle de Criadouros: imóveis trabalhados, fechados e tratamentos \n tipo=6: Áreas Transmissão: imóveis trabalhados, fechados, tratamentos e recip. com água \n tipo=7: Índices Controle: imóveis trabalhados, fechados, recip. com água, larvas e índices \n tipo=8: Aval Densid Larvária: imóveis trabalhados, recip. positivos e índices \n tipo=9: Aval Densid Larvária - Grupo de Recipientes: qualificação de recipients por grupo \n tipo=10: Aval Densid Larvária: índices de recipientes \n tipo=11: Ovitrampa: positividade \n tipo=12: Imóveis Cadastrados: cobertura. Considera existentes antes do período de início \n tipo=13: Imóveis Cadastrados: positividade e tratamentos \n tipo=14: Aval Densid Larvária - Tipo de Recipientes: qualificação de recipients por tipo e censitário \n tipo=15: Visita a Imóveis - Pendência por Setor Censitário \n tipo=16: Visita a Imóveis - Qualificação da Pendência por Setor Censitário'}, 
    { value: "inicio", label: "Início", description: "Inicio do período de interesse (yyyy-mm-dd)"},
    { value: "final", label: "Final", description: "Fim do período de interesse (yyyy-mm-dd)" }
  ];

  const dynamicOptions = [
    { value: "id", label: "Id", description: "Id da região" },
    { value: "exec", label: "exec", description: "Executado pelo Estado ou pelo município " },
  ];

  const handleApiCall = async () => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = "https://vigent.saude.sp.gov.br/sisaweb_api/dados.php?id=1";

      const queryParams = fields
        .filter((field) => field.value)
        .map((field) => {
          const encodedOption = encodeURIComponent(field.option);
          const encodedValue = encodeURIComponent(field.value);
          return `${encodedOption}=${encodedValue}`;
        })
        .join("&");

      const apiUrl = queryParams ? `${baseUrl}&${queryParams}` : baseUrl;

      
      setApiUrl(apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Falha na requisição, status " + response.status);
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addField = () => {
    const newId = fields.length + 1;
    setFields([...fields, { id: newId, option: "", value: "", isFixed: false }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleOptionChange = (id, option) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, option } : field
    );
    setFields(updatedFields);
  };

  const handleValueChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const renderTable = () => {
    if (!apiResponse || apiResponse.length === 0) return null;
    const columns = Object.keys(apiResponse[0]);
  
    return (
      <div>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} style={styles.tableHeader}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {apiResponse.map((item, index) => (
              <tr key={index}>
                {columns.map((column, idx) => (
                  <td key={idx} style={styles.tableData}>
                    {item[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
  
        {/* Botão de glossário */}
        <div style={styles.glossaryButtonContainer}>
          <button
            style={styles.glossaryButton}
            onClick={() =>
              alert(
                "Glossário: \n Focal: nº de imov que tiveram trabalho com foco de dengue \n Perifocal: ação em pontos estratégicos \n Nebulização(Fumacê): Nº de casas afetadas \n Im: imóveis com positivo para cada mosquito \n Área: Partição de um município (cada um tem cerca de 18 áreas)"
              )
            }
          >
            Glossário
          </button>
        </div>
      </div>
    );
  };

return (
  <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", padding: "20px" }}>
    <Navbar />
    <div style={styles.titleContainer}>
      <h1 style={styles.title}>Estatísticas</h1>
      <button
        onClick={() => alert("O Sisaweb é um sistema eletrônico utilizado por órgãos de saúde no Brasil, especialmente no estado de São Paulo, para coleta, armazenamento e consulta de dados epidemiológicos. Ele é parte do Sistema de Informações de Saúde, desenvolvido para facilitar o acompanhamento e análise de informações relacionadas à vigilância epidemiológica e sanitária. A partir da pesquisa, são retornados dados do Sisaweb relativos a arboviroses.")}
        style={styles.helpButtonCircle}
      >
        ?
      </button>
    </div>

    {fields.map((field) => (
      <div key={field.id} style={styles.fieldContainer}>
        <button
          onClick={() =>
            alert(
              fixedOptions.concat(dynamicOptions).find((option) => option.value === field.option)?.description
            )
          }
          style={styles.helpButtonCircle}
        >
          ?
        </button>
        <select
          value={field.option}
          onChange={(e) => handleOptionChange(field.id, e.target.value)}
          disabled={fixedOptions.some((option) => option.value === field.option)}
          style={styles.select}
        >
          {(field.isFixed ? fixedOptions : dynamicOptions).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder={`Digite um valor para ${field.option}`}
          value={field.value}
          onChange={(e) => handleValueChange(field.id, e.target.value)}
          style={styles.input}
        />
        {!field.isFixed && (
          <button
          onClick={() => removeField(field.id)}
          style={styles.removeButton}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF0000")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF5C5C")}
        >
          <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>X</span>
        </button>
        )}
      </div>
    ))}

    <div style={styles.buttonContainer}>
      <button onClick={addField} style={styles.addFieldButton}>
        Adicionar Campo
      </button>
    </div>

    <div style={styles.buttonContainer}>
    <button onClick={handleApiCall} disabled={loading} style={styles.mainButton}>
        {loading ? "Carregando..." : "Realizar Pesquisa no Sisaweb"}
      </button>
    </div>

    {renderTable()}

    {error && <div style={styles.error}>Erro: {error}</div>}
  </div>
);

}

const styles = {
  glossaryButtonContainer: {
    marginTop: "20px", // Espaçamento entre a tabela e o botão
    textAlign: "right", // Alinha o botão no lado direito
    },
  glossaryButton: {
    padding: "8px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
    },
  glossaryButtonHover: {
    backgroundColor: "#45a049", // Cor ao passar o mouse
    },
  titleContainer: {
    display: "flex",
    alignItems: "center", // Alinha o botão "?" com o texto
    justifyContent: "center", // Centraliza horizontalmente
    gap: "10px", // Espaçamento entre o texto e o botão
    marginBottom: "20px", // Espaço entre o título e os campos abaixo
    marginTop: "20px", // Espaço do topo para o título
  },
  title: {
    fontFamily: "'Arial', sans-serif", // Certifique-se de usar a mesma fonte
    fontSize: "32px", // Ajuste para corresponder
    fontWeight: "bold", // Garanta que o texto esteja em negrito
    textAlign: "center", // Centraliza o texto horizontalmente
    margin: "0", // Remove margens extras do título
  },
  helpButtonCircle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
  fieldContainer: { display: "flex", gap: "10px", marginBottom: "15px" },
  select: { flex: 1, padding: "5px" },
  input: { flex: 2, padding: "5px" },
  removeButton: {
    width: "40px", // Largura do botão
    height: "40px", // Altura do botão
    backgroundColor: "#FF5C5C", // Cor de fundo semelhante ao botão fornecido
    color: "black", // Cor do ícone
    borderRadius: "20px", // Bordas arredondadas
    border: "2px solid #FF5C5C", // Borda com mesma cor do fundo para efeito
    display: "flex", // Centraliza o ícone
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer", // Ícone de cursor ao passar o mouse
    fontSize: "20px", // Tamanho do ícone
    fontWeight: "bold", // Deixa o ícone mais destacado
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adiciona sombra para destaque
    transition: "background-color 0.3s ease", // Efeito ao passar o mouse
  },
  removeButtonHover: {
    backgroundColor: "#FF0000", // Cor de destaque ao passar o mouse
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    position: "relative", // Permite controle de posicionamento
  },
  addFieldButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
 mainButton: {
  padding: "15px 30px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontSize: "18px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  textAlign: "center",
  position: "absolute", // Centraliza em relação ao contêiner
  left: "50%",
  transform: "translateX(-50%)",
  marginBottom: "30px", // Adicione margem inferior
},

table: {
  width: "100%",
  marginTop: "40px", // Aumente o espaço entre o botão e a tabela
  borderCollapse: "collapse",
},
  tableHeader: { backgroundColor: "#4CAF50", color: "white", padding: "10px" },
  tableData: { border: "1px solid #ddd", padding: "8px" },
  error: { color: "red", marginTop: "20px" },
};
