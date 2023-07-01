import React, { useState } from 'react';
import pako from 'pako';

function FileUpload() {
  const [fileContent, setFileContent] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      let textData;
      if (file.name.endsWith('.gz')) {
        const gzData = new Uint8Array(e.target.result);
        const decompressedData = pako.inflate(gzData);
        textData = new TextDecoder("utf-8").decode(decompressedData);
      } else {
        textData = new TextDecoder("utf-8").decode(e.target.result);
      }
      const lines = textData.split('\n');
      let reads = '';
      for (let i = 1; i < lines.length; i += 4) {
        reads += lines[i].slice(0, 100) + '\n';
      }
      setFileContent(reads);
    }
    reader.readAsArrayBuffer(file);
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <pre>{fileContent}</pre>
    </div>
  );
}

export default FileUpload;
