import { useState } from "react";
import { Button, TextInput } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

function LinkList({listText, isNew, onDelete}) {
    const [defaultListText, setDefaultListText] = useState('');
    const [defaultListLink, setDefaultListLink] = useState('');
    const [isEditing, setIsEditing] = useState(isNew === true);
  return (
    <div className="BlogHeader blog-components-frame">
    {!isNew ? 
    <ul>
        {listText.map((content) => (
            <li>
                <a href={`#${content.link}`}>{content.text}</a>
            </li>
        ))}
    </ul>
    : isEditing ? '' : 
    <ul className="blog-edit-component">
        {listText.map((content, index) => (
            <li>
                <TextInput type="text" value={content.text} onChange={(e) => {const tempArray = [...defaultListText]; tempArray[index] = e.target.value}}/>
                <TextInput type="text" labelText="Lien (id)" value={content.link} onChange={(e) => {const tempArray = [...defaultListLink]; tempArray[index] = e.target.value}}/>
            </li>
        ))}
        <Button icon={faEdit} onClick={() => setIsEditing(true)} />
    </ul>
    }
    {isNew && isEditing ?  
        <div className="edit-container">
            {listText.map((content, index) => (
                <>
                    <TextInput labelText="Texte :" value={content.text} onChange={(e) => {content.text = e.target.value}} />
                    <TextInput type="text" labelText="Lien (id) :" value={content.link} onChange={(e) => {content.link = e.target.value}} />
                </>
            ))}
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