import React from 'react';
import '../../CSS/components.css';

function IconBox({icon, title, description, }) {
  return (
    <div className='iconBox hidden'>
        <div className='icon-circle'>
            <img src={icon} alt="icon service" />
        </div>
        <h3 className='icon-title'>{title}</h3>
        <p className='icon-desc'>{description}</p>
        {/* <a className='icon-button' href='#'>{textButton}</a>  ajouter le textButton dans les elements pour l'appeller */}

    </div>
  )
}

export default IconBox