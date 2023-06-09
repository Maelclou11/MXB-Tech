import { useState } from "react";
import { Button } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function LinkList({listText, listLink, isNew, onDelete}) {
    const [defaultListText, setDefaultListText] = useState('');
    const [defaultListLink, setDefaultListLink] = useState('');
    const [title, setTitle] = useState('');
    const [isEditing, setIsEditing] = useState(isNew === true);
  return (
    <div className="BlogHeader blog-components-frame">
    {!isNew ? <h1>{title}</h1> : isEditing ? '' : 
    <div className="blog-edit-component">
        <h1>{defaultTitle}</h1>
        <p className="author">{author} • <span>{date}</span></p>
        <Button icon={faEdit} onClick={() => setIsEditing(true)} />
    </div>
    }
    {isNew && isEditing ?  
        <div className="edit-container">
            <label htmlFor="">
                Titre h2 :
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <div className="btn-container">
                {onDelete ? <Button text="Supprimer" className="red white" onClick={() => {onDelete(); setIsEditing(false)}}/> : ''}
                <Button text="Sauvegarder" className="c-main" onClick={() => setIsEditing(false)}/>
            </div>
        </div>
    :
        ''
    }
</div>
  )
}

export default LinkList