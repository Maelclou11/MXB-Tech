import React from 'react';
import Select from 'react-select'; // import du composant "react-select"

function Dropdown({ref, options, onChange, value, placeholder, className, isMulti=false}) {

  return (
    <div>
        <Select 
          ref={ref}
          options={options} 
          onChange={onChange} 
          value={value}
          placeholder={placeholder}
          className={`dropdown ${className}`}
          isMulti={isMulti} // ajout de la propriété isMulti
        />
    </div>
  );
}

export default Dropdown;
