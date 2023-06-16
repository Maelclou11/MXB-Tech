import { useState } from "react";
import "../../CSS/componentsBlog.css";
import { Button } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

function Title ({title, author, date, isNew, onSave}) {
    const [defaultTitle, setDefaultTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    return(
        <div className="BlogHeader blog-components-frame">
            {!isNew ? 
                <div className="blog-edit-component">
                    <h1>{title}</h1>
                    <p className="author">{author} • <span>{date}</span></p>
                </div>
            :
             isEditing ? 
                <div className="edit-container">
                    <label htmlFor="">
                        Titre du blog :
                        <input type="text" value={defaultTitle} onChange={(e) => setDefaultTitle(e.target.value)} />
                    </label>
                    <div className="btn-container">
                        <Button text="Annuler" className="red white" onClick={() => { setIsEditing(false)}}/>
                        <Button text="Sauvegarder" className="c-main" onClick={() => {onSave(defaultTitle); setIsEditing(false)}}/>
                    </div>
                </div>
            : 
                <div className="blog-edit-component">
                    <h1>{defaultTitle}</h1>
                    <p className="author">{author} • <span>{date}</span></p>
                    <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
                </div>
            }
        </div>
    )
}
export default Title