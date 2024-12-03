import React, { useState, useEffect, useRef } from "react";
import "highlight.js/styles/atom-one-dark.css"; 
import "quill/dist/quill.snow.css"; 
import "katex/dist/katex.min.css";

const QuillEditor = ({ title, category, content, onTitleChange, onCategoryChange, onContentChange }) => {
  const quillRef = useRef(null);
  const [quillInstance, setQuillInstance] = useState(null);

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
  return (
    <div>
      <input
           type="text"
           placeholder="Título da página"
           value={title}
           onChange={(e) => onTitleChange(e.target.value)}
           className="w-2xl p-2 mb-4 border rounded text-lg mr-10"
         />
         <input
             type="text"
             placeholder="Categoria"
             value={category}
             onChange={(e) => onCategoryChange(e.target.value)}
             className="w-2xl p-2 mb-4 border rounded text-lg"
           />
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
    </div>
  );
};

export default QuillEditor;