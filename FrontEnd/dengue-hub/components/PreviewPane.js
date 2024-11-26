import React from "react";
import ReactMarkdown from "react-markdown";

const PreviewPane = ({ content }) => {
  return (
    <div className="markdown-preview bg-gray-100 p-4 rounded-md">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default PreviewPane;