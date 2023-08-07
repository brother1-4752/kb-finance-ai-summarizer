import React, { useState } from 'react';

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        uploadFile(file);
      } else {
        alert('PDF 파일만 업로드 가능합니다.');
      }
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file.type === 'application/pdf') {
      uploadFile(file);
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  };

  const uploadFile = (file) => {
    // 파일 업로드를 수행하는 로직을 구현
    // 이곳에서 파일을 서버로 보내거나, 필요한 작업을 수행합니다.
    console.log('업로드할 파일:', file);
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      <label
        htmlFor="fileInput"
        style={{
          border: `2px dashed ${isDragging ? 'blue' : '#ccc'}`,
          padding: '20px',
          cursor: 'pointer',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging ? '드롭하세요!' : '드래그하여 PDF 파일을 업로드하세요.'}
      </label>
    </div>
  );
};

export default FileUpload;
