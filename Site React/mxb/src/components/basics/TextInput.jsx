import React from 'react';
import "../../CSS/components.css";

function TextInput({ labelText, name, type, placeholder, value, onChange, maxLength }) {

  return (
    <div className="text-input">
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}

export default TextInput;
