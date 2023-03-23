import React from 'react';
import '../CSS/components.css';

function TitleSection({aboveTitle, title, specialWord}) {
  return (
    <div className='title-section'>
        <p className='above-title'>{aboveTitle}</p>
        <h2 className='title-h2'>{title} <span className='gradient-word'>{specialWord}</span></h2>
    </div>
  )
}

export default TitleSection