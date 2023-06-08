import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Button({icon, route, className, type, text, onClick}) {
  return (
    <div className={`Button`}>
        <Link to={route}>
            <button 
              className={`${className}`} 
              type={type}
              onClick={onClick}>
                {text}
                {icon ? <FontAwesomeIcon icon={icon}/> : ''}
            </button>
        </Link>
    </div>
  )
}

export default Button