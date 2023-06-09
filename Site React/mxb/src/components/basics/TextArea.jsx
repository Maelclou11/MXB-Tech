import React from 'react';

function TextArea({ labelText, name, placeholder, value, onChange }) {
  return (
    <div className="text-area">
      <label htmlFor={name}>{labelText}</label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
      />
    </div>
  );
}

export default TextArea;
