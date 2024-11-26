// pages/markdown.js
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from '../components/MarkdownEditor';
import remarkGfm from 'remark-gfm'; // for tables, strikethrough, etc.
import rehypeRaw from 'rehype-raw'; // allows raw HTML rendering (if needed)

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  // Debounced preview update for smooth typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPreviewContent(markdown);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [markdown]);

  const handleSave = async () => {
    if (!title || !markdown) {
      alert("Please provide both a title and content.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/your-api-endpoint', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: markdown,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save page');
      }

      alert('Page saved successfully!');
      setTitle('');
      setMarkdown('');
    } catch (error) {
      console.error(error);
      alert('Error saving the page.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Wiki Page</h1>

      {/* Title input with full width */}
      <input
        type="text"
        placeholder="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded text-lg"
      />

      {/* Flex container for the editor and preview */}
      <div className="flex border rounded bg-white">
        <div className="w-1/2 p-4">
          <MarkdownEditor onSave={handleSave} initialMarkdown={markdown} onChange={(value) => setMarkdown(value)} />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded mt-4"
          >
            {isSaving ? 'Saving...' : 'Save Page'}
          </button>
        </div>

        {/* Preview on the right */}
        <div className="w-1/2 p-4 border-l overflow-auto bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Preview</h2>
          <ReactMarkdown
            children={previewContent}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="prose max-w-none" // using prose for typography styling
          />
        </div>
      </div>
    </div>
  );
}
