import React, { useState, useEffect, useRef } from "react";
import "highlight.js/styles/atom-one-dark.css"; 
import "quill/dist/quill.snow.css"; 
import "katex/dist/katex.min.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const QuillEditor = ({ title, category, content, onTitleChange, onCategoryChange, onContentChange }) => {
  const quillRef = useRef(null);
  const [quillInstance, setQuillInstance] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  
  async function handleSave() {

    const rawText = quillRef.current.getText();
    if (!title || !category || rawText.trim()=='') {
      alert("Preencha todos os campos necessários");
      return;
    }

    const html = quillRef.current.root.innerHTML;

    const data = {
        id: 0,
        title: title,
        category: category,
        content: html,
        author_id: 7,   //TROCAR DPS!!!!!!!!!!!!!!!!!
        created_at: "2024-01-01T00:00:00"
    };

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
            alert('Artigo Salvo!');
        } else {
            throw new Error('`Erro ao salvar: ${errorData.detail || "Tente novamente."}`')
        }
    } catch (error) {
        console.error(error);
        alert('Error saving the page.');
    }
}

  useEffect(() => {
    let Quill, hljs;

    const loadHighlightAndQuill = async () => {
      hljs = (await import("highlight.js")).default;

      const QuillImport = (await import("quill")).default;
      Quill = QuillImport;

      const quill = new Quill(quillRef.current, {
        modules: {
          syntax: false,
          toolbar: "#toolbar-container",
        },
        placeholder: "Texto do artigo...",
        theme: "snow",
      });

      quill.root.innerHTML = content;

      quill.on('text-change', () => {
        onContentChange(quill.root.innerHTML);
      });

      setQuillInstance(quill);
    };

    loadHighlightAndQuill();
  }, []);

  useEffect(() => {
    if (quillInstance && quillInstance.root.innerHTML !== content) {
      quillInstance.root.innerHTML = content;
    }
  }, [content, quillInstance]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Título da página"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="w-2xl p-2 mb-4 border rounded text-lg mr-10"
      />
      {/* <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-2xl p-2 mb-4 border rounded text-lg"
      />
          type="text"
          placeholder="Título da página"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 mb-4 border rounded text-lg"
          /> */}
      <div className="w-64 mb-4 border rounded text-lg">    
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Categoria"
              onChange={handleChange}
            >
              <MenuItem value={"mosquito"}>Mosquito</MenuItem>
              <MenuItem value={"prevencao"}>Prevenção</MenuItem>
              <MenuItem value={"tratamento"}>Tratamento</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
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
      <div ref={quillRef} style={{ height: "400px" }}></div>
      <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded mt-4"
          >
          {isSaving ? 'Saving...' : 'Save Page'}
      </button>
    </div>
  );
};

export default QuillEditor;