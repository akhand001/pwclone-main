import React, { useRef, useEffect, useState } from 'react';

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkValue, setLinkValue] = useState('');

  // Keep innerHTML in sync with value
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (command, val = null) => {
    document.execCommand(command, false, val);
    onChange?.(editorRef.current.innerHTML); // Emit HTML content
  };

  const handleInput = () => {
    onChange?.(editorRef.current.innerHTML);
  };

  const handleLinkDialog = (url) => {
    setLinkValue(url);
    setIsLinkDialogOpen(false);
    exec('createLink', url);
  };

  const openLinkDialog = () => {
    const url = prompt('Enter URL:');
    if (url) exec('createLink', url);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-t-md bg-gray-100">
        <button
          onClick={() => exec('bold')}
          className="btn font-bold"
          aria-label="Bold"
        >
          B
        </button>
        <button
          onClick={() => exec('italic')}
          className="btn italic"
          aria-label="Italic"
        >
          I
        </button>
        <button
          onClick={() => exec('underline')}
          className="btn underline"
          aria-label="Underline"
        >
          U
        </button>
        <button
          onClick={() => exec('insertUnorderedList')}
          className="btn"
          aria-label="Unordered List"
        >
          UL
        </button>
        <button
          onClick={() => exec('insertOrderedList')}
          className="btn"
          aria-label="Ordered List"
        >
          OL
        </button>
        <button
          onClick={() => exec('formatBlock', '<h1>')}
          className="btn"
          aria-label="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => exec('formatBlock', '<h2>')}
          className="btn"
          aria-label="Heading 2"
        >
          H2
        </button>
        <button
          onClick={openLinkDialog}
          className="btn"
          aria-label="Insert Link"
        >
          🔗
        </button>
        <button
          onClick={() => exec('removeFormat')}
          className="btn"
          aria-label="Remove Formatting"
        >
          Tx
        </button>
        <button
          onClick={() => exec('foreColor', 'red')}
          className="btn"
          aria-label="Text Color Red"
        >
          <span className="text-red-500">A</span>
        </button>
        <button
          onClick={() => exec('fontSize', '5')}
          className="btn"
          aria-label="Font Size"
        >
          A+
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="border border-t-0 rounded-b-md min-h-[200px] p-4 bg-white focus:outline-none"
        aria-label="Rich Text Editor"
      />

      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Insert Link</h3>
            <input
              type="text"
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="border p-2 w-full my-2"
              placeholder="Enter URL"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleLinkDialog(linkValue)}
                className="btn bg-blue-600 text-white"
              >
                Insert
              </button>
              <button
                onClick={() => setIsLinkDialogOpen(false)}
                className="btn bg-gray-600 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
