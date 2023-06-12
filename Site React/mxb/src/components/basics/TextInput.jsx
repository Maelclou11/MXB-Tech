import React from 'react';
import "../../CSS/components.css";

function TextInput({ labelText, name, type, placeholder, value, onChange, maxLength, className, readOnly, max, min }) {

  return (
    <div className={`text-input ${className}`}>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        readOnly= {readOnly ? true : false}
        max={max}
        min={min}
      />
    </div>
  );
}

export default TextInput;
