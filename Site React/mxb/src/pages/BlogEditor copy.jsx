import React, {useState} from 'react';
import { Navbar, Dropdown, Paragraphe, Title } from '../components/indexComponents';
import '../CSS/BlogEditor.css';

function BlogEditor() {
    const [componentToAdd, setComponentToAdd] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [components, setComponents] = useState([]);

    const [title, setTitle] = useState('');

    const componentsData = [
        {id: 1, name: 'Title', title: 'Titre Principale'},
        {id: 2, name: 'Paragraphe', text: ""}
    ];
    const componentsOptions = [
        ...componentsData.map((component) => ({
            value: component.id,
            label: component.name
        })),
    ];

    const editNewComponent = () => {
        setTitle(componentToAdd.title);
        setIsEditing(true);
    };

    const addNewComponent = () => {
        const temp = {...componentToAdd};
        temp.title = title;

        const tempArray = [...components];
        tempArray.push(temp);
        setComponents(tempArray);

        setIsEditing(false);
    };

    const handleDropdownChange = (selectedOption) => {
        const selectedComponent  = componentsData.find((component) => component.id === selectedOption.value)
        setComponentToAdd({...selectedComponent});
    };

  return (
    <div className='blog'>
        <Navbar />
        <div className="blog-content">
            <Dropdown options={componentsOptions} value={componentToAdd.value} onChange={handleDropdownChange}/>
            <button onClick={editNewComponent}>Ajouter</button>
            {components.map((component, index) => {
                return (
                    <div key={index}>
                        {component.id === 1 && <Title title={component.title} />}
                        {component.id === 2 && <Paragraphe />}
                    </div>
                );
            })}

            {isEditing ? 
                <div className='edit-component-container'>
                    <h2>Modifier le component à ajouter</h2>
                    <label htmlFor="">
                        {componentToAdd.name} :
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <button onClick={addNewComponent}>Sauvegarder</button>
                </div>
            :    
                ''
            }
        </div>
    </div>
  )
}

export default BlogEditor