import React from 'react';

const TextArea = React.forwardRef(({ labelText, name, placeholder, value, onChange, className }, ref) => {
  return (
    <div className="text-area">
      <label htmlFor={name} className='font-size-1'>{labelText}</label>
      <textarea
        ref={ref}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        className={className}
      />
    </div>
  );
});

export default TextArea;
