import { useState } from "react";
import "../../CSS/componentsBlog.css";
import { Button } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

function TitreH2 ({title, isNew, onDelete}) {
    const [defaultTitle, setDefaultTitle] = useState('');
    const [isEditing, setIsEditing] = useState(isNew === true);

    return(
        <div className="blog-components-frame">
            {!isNew ? <h2>{title}</h2> : isEditing ? '' : 
            <div className="blog-edit-component">
                <h2>{defaultTitle}</h2>
                <Button icon={faEdit} onClick={() => setIsEditing(true)} />
            </div>
            }
            {isNew && isEditing ?  
                <div className="edit-container">
                    <label htmlFor="">
                        Titre h2 :
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
export default TitreH2