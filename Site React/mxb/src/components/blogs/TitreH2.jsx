import { useState } from "react";
import "../../CSS/componentsBlog.css";
import { Button, TextInput } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

function TitreH2 ({title, textId, isNew, onDelete}) {
    const [defaultTitle, setDefaultTitle] = useState('');
    const [id, setId] = useState(null);
    const [isEditing, setIsEditing] = useState(isNew === true);

    return(
        <div className="blog-components-frame TitreH2">
            {!isNew ? <h2 id={textId}>{title}</h2> : isEditing ? '' : 
            <div className="blog-edit-component">
                <h2 id={id}>{defaultTitle}</h2>
                <Button icon={faEdit} onClick={() => setIsEditing(true)} />
            </div>
            }
            {isNew && isEditing ?  
                <div className="edit-container">
                    <div className="row w-100">
                        <TextInput labelText="Titre h2 :" type="text" value={defaultTitle} onChange={(e) => setDefaultTitle(e.target.value)} className="title-input" />
                        <TextInput labelText="id :" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
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