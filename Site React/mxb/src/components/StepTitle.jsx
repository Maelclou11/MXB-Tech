import React from 'react'

function StepTitle({number, title, text}) {
  return (
    <div className='step'>
        <div className="step--number">
            <span></span>
            <p>{number}</p>
            <h3 className='step--title'>{title}</h3>
        </div>
        <div className="step--text">
            <p>{text}</p>
        </div>
    </div>
  )
}

export default StepTitle