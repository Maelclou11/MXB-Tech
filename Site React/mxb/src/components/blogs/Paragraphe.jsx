import { useState } from "react";
import "../../CSS/componentsBlog.css";
import { Button, TextArea } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function Paragraphe({text, isNew, onDelete}){
    const [defaultText, setDefaultText] = useState('');
    const [isEditing, setIsEditing] = useState(isNew === true);
    return(
        <div className="ParagrapheBlog blog-components-frame">
            {!isNew ? <p className="">{text}</p> : isEditing ? '' : 
            <div className="blog-edit-component">
                <p className="">{defaultText}</p>
                <Button icon={faEdit} onClick={() => setIsEditing(true)} />
            </div>
            }
            {isNew && isEditing ?  
                <div className="edit-container">
                    <TextArea value={defaultText} onChange={(e) => setDefaultText(e.target.value)} />
                    <div className="btn-container">
                        <Button text="Supprimer" className="red white" onClick={() => {onDelete(); setIsEditing(false)}}/>
                        <Button text="Sauvegarder" className="c-main" onClick={() => setIsEditing(false)}/>
                    </div>
                </div>
            :
                ''
            }
        </div>
    )
}
export default Paragraphe