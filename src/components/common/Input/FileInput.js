import React, { useState } from 'react';

function FileInput({ accept, id, fileHandleFnc, text }) {
  
  const [fileSelected, setFileSelected] = useState("");

  const onChange = (event) => {
    console.log(event.target.files[0]);
    setFileSelected(event.target.files[0].name)
    fileHandleFnc(event.target.files[0])
  };

  return (
    <>
      <label htmlFor={id} className='custom-input' >
        {fileSelected ? `${fileSelected}` : text}
        </label>
      <input 
        type='file' 
        accept={accept} 
        id={id} 
        style={{ display: 'none' }} 
        onChange={onChange}
        
      />
    </>
  );
}

export default FileInput;
