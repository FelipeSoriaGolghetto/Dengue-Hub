import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import "react-markdown-editor-lite/lib/index.css";

const ReactMarkdownEditorLite = dynamic(() => import("react-markdown-editor-lite"), { ssr: false });

const MarkdownEditor = ({ onChange }) => {
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }) => {
    setContent(text);
    onChange(text);
  };

  return (
    <ReactMarkdownEditorLite value={content} onChange={handleEditorChange} />
  );
};

export default MarkdownEditor;