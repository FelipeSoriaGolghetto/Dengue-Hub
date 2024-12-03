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
    { value: "tipo", label: "Tipo", description: "Descrição sobre o Tipo" },
    { value: "inicio", label: "Início", description: "Descrição sobre o Início" },
    { value: "final", label: "Final", description: "Descrição sobre o Final" },
  ];

  const dynamicOptions = [
    { value: "opcao1", label: "Opção 1", description: "Descrição sobre a Opção 1" },
    { value: "opcao2", label: "Opção 2", description: "Descrição sobre a Opção 2" },
    { value: "opcao3", label: "Opção 3", description: "Descrição sobre a Opção 3" },
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
    );
  };

return (
  <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", padding: "20px" }}>
    <Navbar />
    <div style={styles.titleContainer}>
      <h1 style={styles.title}>Estatísticas</h1>
      <button
        onClick={() => alert("Informações sobre as estatísticas.")}
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
    left: "50%", // Corrigido com aspas
    transform: "translateX(-50%)", // Centraliza horizontalmente
  },
  table: { width: "100%", marginTop: "20px", borderCollapse: "collapse" },
  tableHeader: { backgroundColor: "#4CAF50", color: "white", padding: "10px" },
  tableData: { border: "1px solid #ddd", padding: "8px" },
  error: { color: "red", marginTop: "20px" },
};
