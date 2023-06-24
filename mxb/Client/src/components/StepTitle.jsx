import React from 'react';
import {Animation} from './indexComponents';

function StepTitle({ className, number, title, text }) {

  return (
    <div className={`${className || ''} step hidden`}>
      <Animation/>
        <div className="step--number">
            <span className='hidden span'></span>
            <p className='hidden number'>{number}</p>
            <h3 className='step--title'>{title}</h3>
        </div>
        <div className="step--text">
            <p>{text}</p>
        </div>
    </div>
  )
};

export default StepTitle;
