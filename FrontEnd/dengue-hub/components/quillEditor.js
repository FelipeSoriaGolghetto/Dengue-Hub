import React, { useState, useEffect, useRef } from "react";
import "highlight.js/styles/atom-one-dark.css"; 
import "quill/dist/quill.snow.css"; 
import "katex/dist/katex.min.css";

const QuillEditor = () => {
  
  const quillRef = useRef(null); // Criação da referência
  const [isSaving, setIsSaving] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    const quill = quillRef.current;
    const delta = quill.getContents(); // Conteúdo em formato Delta
    const html = quill.root.innerHTML; // Conteúdo como HTML
    const text = quill.getText(); // Apenas o texto plano
  
    console.log("Delta:", delta);
    console.log("HTML:", html);
    console.log("Texto:", text);
  };

  async function handleSave3() {
    // async function handleSave3(e: React.FormEvent<HTMLFormElement>) {
    // e.preventDefault();
    // setErrors([]); // Limpa erros anteriores
    // setMessage(null); // Limpa mensagens gerais

    // const formData = new FormData(e.currentTarget);
    const html = quillRef.current.root.innerHTML;

    const data = {
        id: 0,
        title: title,
        category: category,
        content: html,
        author_id: 7,   //TROCAR DPS!!!!!!!!!!!!!!!!!
        created_at: "2024-01-01T00:00:00"
    };

    // if (validationErrors.length > 0) {
    //     // setErrors(validationErrors); // Exibe os erros
    //     return; // Interrompe a execução se houver erros
    // }

    // Envio da requisição HTTP
    console.log(JSON.stringify(data));
    try {
        const response = await fetch("http://127.0.0.1:8000/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

        if (response.ok) {
            // setMessage("Artigo Salvo!");
            // setIsError(false);
        } else {
            const errorData = await response.json();
            // setMessage(`Erro ao salvar: ${errorData.detail || "Tente novamente."}`);
            // setIsError(true);
        }
    } catch (error) {
        console.error();
        // setMessage(error instanceof Error ? error.message : String(error));
        // setIsError(true);
    }
}

  useEffect(() => {
    let hljs, Quill;

    const loadHighlightAndQuill = async () => {
      hljs = (await import("highlight.js")).default;

      const QuillImport = (await import("quill")).default;
      Quill = QuillImport;

      quillRef.current = new Quill("#editor", {
        modules: {
          // syntax: {highlight: hljs.highlightAuto,},
          syntax: false,
          
          toolbar: "#toolbar-container",
        },
        placeholder: "Texto do artigo...",
        theme: "snow",
      });
    };

    loadHighlightAndQuill();
  }, []);

  return (
    <div>
      <input
          type="text"
          placeholder="Título da página"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-2xl p-2 mb-4 border rounded text-lg mr-10"
          />
      <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-2xl p-2 mb-4 border rounded text-lg"
          />
        {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      <div id="toolbar-container">
        <span className="ql-formats">
          <select className="ql-font"></select>
          <select className="ql-size"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="sub"></button>
          <button className="ql-script" value="super"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button>
          <button className="ql-blockquote"></button>
          <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <button className="ql-indent" value="-1"></button>
          <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-direction" value="rtl"></button>
          <select className="ql-align"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-video"></button>
          <button className="ql-formula"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </div>
      <div id="editor" style={{ height: "400px" }}></div>
      <button
          onClick={handleSave3}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded mt-4"
          >
          {isSaving ? 'Saving...' : 'Save Page'}
      </button>
    </div>
  );
};

export default QuillEditor;
