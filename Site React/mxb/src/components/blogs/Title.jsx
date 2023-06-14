import { useState } from "react";
import "../../CSS/componentsBlog.css";
import { Button } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

function Title ({title, author, date, isNew, onDelete}) {
    const [defaultTitle, setDefaultTitle] = useState('');
    const [isEditing, setIsEditing] = useState(isNew === true);

    return(
        <div className="BlogHeader blog-components-frame">
            {!isNew ? 
            <div className="blog-edit-component">
                <h1>{title}</h1>
                <p className="author">{author} • <span>{date}</span></p>
            </div>
            : isEditing ? '' : 
            <div className="blog-edit-component">
                <h1>{defaultTitle}</h1>
                <p className="author">{author} • <span>{date}</span></p>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
            </div>
            }
            {isNew && isEditing ?  
                <div className="edit-container">
                    <label htmlFor="">
                        Titre du blog :
                        <input type="text" value={defaultTitle} onChange={(e) => setDefaultTitle(e.target.value)} />
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
export default Title