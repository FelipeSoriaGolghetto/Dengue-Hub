import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar';
import QuillEditor from '../components/quillEditor';

export default function QuillMarkdown() {
  const [markdown, setMarkdown] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPreviewContent(markdown);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [markdown]);
  
  return (
    <div>
      <div className="mt-5">
        <Navbar/>
      </div>
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Crie uma nova página da Wiki</h1>
        <div className="w-2xl mx-auto p-8">
          <QuillEditor />
        </div>
      </div>
    </div>
  );
}
