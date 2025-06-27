import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload.");
    alert(`Successfully uploaded ${file.name}! (demo)`);
  };

  return (
    <div className="p-4 bg-purple-50 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-pink-600 text-white rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
