import { useState } from "react";
import { Button, TextInput } from '../indexComponents';
import { faEdit, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function LinkList({listText, isNew, onDelete, index, onUpdate, isPreview}) {
    const [defaultList, setDefaultList] = useState(listText);
    const emptyRow = {text: '', link: '', isNew: false, children: []};
    const emptyRowChildren = {text: '', link: ''};
    const [isEditing, setIsEditing] = useState(isNew === true);

    const addRow = (indexToInsert) => {
        const tempArray = [...defaultList];
        tempArray.splice(indexToInsert + 1, 0 , emptyRow);
        setDefaultList(tempArray);
    };
    const removeRow = (indexToremove) => {
        const tempArray = [...defaultList];
        tempArray.splice(indexToremove, 1);
        setDefaultList(tempArray);
    };
    const addChildren = (index, indexChild) => {
        const tempArray = [...defaultList];
        tempArray[index].children.splice(indexChild + 1, 0 ,emptyRowChildren)
        setDefaultList(tempArray);
    };
    const removeChildren = (index, indexChild) => {
        const tempArray = [...defaultList];
        tempArray[index].children.splice(indexChild, 1)
        setDefaultList(tempArray);
    };
    const save = () => {
        const tempArray = [...defaultList];
        tempArray.map((content) => {
            content.isNew = false;
        })
        setDefaultList(tempArray);
    }

  return (
    <div className="blog-components-frame">
    {!isNew && !isPreview ? 
    <ul className="LinkList">
        {listText.map((content, index) => (
            <div key={index} className="li">
                <li className="main-list-item">
                    {content.link ? <a href={`#${content.link}`}>{content.text}</a> : <p>{content.text}</p>}
                </li>
                {content.children.length > 0 ? 
                    <ul className="child-list">
                        {content.children.map((content) => (
                            <li>
                                {content.link ? <a href={`#${content.link}`}>{content.text}</a> : <p>{content.text}</p>}
                            </li>
                        ))}
                    </ul>
                :
                    ""
                }
            </div>
        ))}
    </ul>
    : isEditing ? '' : listText ?
    <ul className="blog-edit-component LinkList">
        {listText.map((content, index) => (
            <div key={index} className={index === listText.length - 1 ? 'last-item' : ''}>
                <li>
                    {content.link ? <a href={`#${content.link}`}>{content.text}</a> : <p>{content.text}</p>}
                </li>
                {content.children.length > 0 ? 
                    <ul className="child-list">
                        {content.children.map((content) => (
                            <li>
                                {content.link ? <a href={`#${content.link}`}>{content.text}</a> : <p>{content.text}</p>}
                            </li>
                        ))}
                    </ul>
                :
                    ""
                }
            </div>
        ))}
        <Button icon={faEdit} onClick={() => setIsEditing(true)} />
    </ul>
    :
    ''
    }
    {isNew || isEditing ?  
        /* Quand il est nouveau et qu'on l'edit */
        <div className="edit-container">
            {defaultList.map((content, index) => (
                <div className="content-row" key={index}>
                    <div className="row">
                        <TextInput type="text" labelText="Texte :" value={content.text} onChange={(e) => {const tempArray = [...defaultList]; tempArray[index].text = e.target.value; setDefaultList(tempArray)}}/>
                        <TextInput type="text" labelText="Lien (id) :" value={content.link} onChange={(e) => {const tempArray = [...defaultList]; tempArray[index].link = e.target.value; setDefaultList(tempArray)}}/>
                        <div className="btn-container">
                            <Button icon={faMinus} className="c-main" onClick={() => removeRow(index)}/>
                            {content.children.length > 0 ? '' : <Button text="Ajouter un sous-liste" className="c-main" onClick={() => addChildren(index)}/>}
                        </div>
                    </div>
                    {content.children.length > 0 ? 
                    <ul className="child-list-edit">
                        {content.children.map((content, indexChild) => (
                            <li key={indexChild} className="row">
                                <div className="row">
                                    <TextInput type="text" labelText="Texte :" value={content.text} onChange={(e) => {const tempArray = [...defaultList]; tempArray[index].children[indexChild].text = e.target.value; setDefaultList(tempArray)}}/>
                                    <TextInput type="text" labelText="Lien (id) :" value={content.link} onChange={(e) => {const tempArray = [...defaultList]; tempArray[index].children[indexChild].link = e.target.value; setDefaultList(tempArray)}}/>
                                </div>
                                <div className="btn-container">
                                    <Button icon={faPlus} className="c-main" onClick={() => addChildren(index, indexChild)}/>
                                    <Button icon={faMinus} className="c-main" onClick={() => removeChildren(index ,indexChild)}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                    :
                        ""
                    }
                    <div className="add-btn-container">
                        <Button icon={faPlus} className="c-main" onClick={() => addRow(index)}/>
                    </div>
                </div>

            ))}
            <div className="btn-container">
                {onDelete ? <Button text="Supprimer" className="red white" onClick={() => {onDelete(); setIsEditing(false)}}/> : ''}
                <Button text="Sauvegarder" className="c-main" onClick={() => { save(); setIsEditing(false); onUpdate(defaultList, index)}}/>
            </div>
        </div>
    :
        ''
    }
</div>
  )
}

export default LinkList