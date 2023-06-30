import { useState } from "react";
import "../../CSS/componentsBlog.css";
import { Button, TextInput } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

function TitreH2 ({title, textId, isNew, onDelete, index, onUpdate, isPreview}) {
    const [defaultTitle, setDefaultTitle] = useState(title);
    const [id, setId] = useState(textId);
    const [isEditing, setIsEditing] = useState(isNew === true);

    return(
        <div className="blog-components-frame TitreH2">
            {!isNew && !isPreview ? <h2 id={textId}>{title}</h2> : isEditing ? '' : 
            title ?
            <div className="blog-edit-component">
                <h2 id={textId}>{title}</h2>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
            </div>
            :
            <div className="blog-edit-component">
                <h2 id={id}>{defaultTitle}</h2>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
            </div>
            }
            {isNew || isEditing ?  
                <div className="edit-container">
                    <div className="row w-100">
                        <TextInput labelText="Titre h2 :" type="text" value={defaultTitle} onChange={(e) => setDefaultTitle(e.target.value)} className="title-input" />
                        <TextInput labelText="id :" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div className="btn-container">
                        {onDelete ? <Button text="Supprimer" className="red white" onClick={() => {onDelete(); setIsEditing(false)}}/> : ''}
                        <Button text="Sauvegarder" className="c-main" onClick={() => {setIsEditing(false); onUpdate({titre: defaultTitle, isNew: false, textId: id}, index);}}/>
                    </div>
                </div>
            :
                ''
            }
             {/* <button onClick={() => console.log(`isEditing: ${isEditing} || isNew: ${isNew} || isPreview: ${isPreview}`)}>Voir</button> */}
        </div>
    )
}
export default TitreH2