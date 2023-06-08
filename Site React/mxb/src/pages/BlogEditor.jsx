import React, {useState} from 'react';
import { Navbar, Dropdown, Paragraphe, Title } from '../components/indexComponents';
import '../CSS/BlogEditor.css';

function BlogEditor() {
    const [componentToAdd, setComponentToAdd] = useState([]);
    const [components, setComponents] = useState([]);

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

    const addNewComponent = () => {
        const tempArray = [...components];
        tempArray.push(componentToAdd);
        setComponents(tempArray);
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
            <button onClick={addNewComponent}>Ajouter</button>
            {components.map((component, index) => {
                return (
                    <div key={index}>
                        {component.id === 1 && <Title title={component.title} isNew={true}/>}
                        {component.id === 2 && <Paragraphe />}
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default BlogEditor