// components/QuillEditor.js
import { useEffect, useRef  } from "react";
import dynamic from "next/dynamic";

// Estilos necessários
import "quill/dist/quill.snow.css"; // Estilo do Quill
import "highlight.js/styles/atom-one-dark.css"; // Estilo do highlight.js
import "katex/dist/katex.min.css"; // Estilo do KaTeX
import 'highlight.js/styles/default.css';

const QuillEditor = () => {

  useEffect(() => {
    let Quill, hljs;

    // Carregar o Highlight.js primeiro
    const loadHighlightAndQuill = async () => {
      hljs = (await import("highlight.js")).default;

      // Depois carrega o Quill
      const QuillImport = (await import("quill")).default;
      Quill = QuillImport;

      // Configura o Quill com o módulo de sintaxe e o Highlight.js
      const quill = new Quill("#editor", {
        modules: {
          syntax: false,//{
          //   highlight: hljs.highlightAuto, // Usando highlight.js para destacar o código
          // },
          toolbar: "#toolbar-container",
        },
        placeholder: "Compose an epic...",
        theme: "snow",
      });
    };

    loadHighlightAndQuill();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default QuillEditor;
