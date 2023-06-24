import React from 'react'
import '../CSS/components.css';

function StatCircle({stat, text}) {
  return (
    <div className='circleStat'>
        <div className='stat--circle'>
            <p className='stat'>{stat}</p>
        </div>
        <p className='stat--text'>{text}</p>
    </div>
  )
}

export default StatCircle