import React, {useState} from 'react';
import { Navbar, Dropdown, Paragraphe, Title, Button, TextInput } from '../components/indexComponents';
import '../CSS/BlogEditor.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


function BlogEditor() {
    const [componentToAdd, setComponentToAdd] = useState([]); // Contient le component VIDE que l'on a selectionner
    const [components, setComponents] = useState([]);  // Liste de tous les components créés
    const [addComponent, setAddComponent] = useState(false);  // Bool pour savoir si on a cliqué sur le + afin d'ajouter un component  (Nécessaire pour cacher le dropdown en cliquant sur le + et inversement (pour cacher le + quand on clique sur le dropdown))
    const [author, setAuthor] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    const componentsData = [
        {id: 1, name: 'Title', content: [{titre: ""}]},
        {id: 2, name: 'Paragraphe', text: ""}
    ];
    const componentsOptions = [
        ...componentsData.map((component) => ({
            value: component.id,
            label: component.name
        })),
    ];

    // Lorsqu'on change la valeur du dropdown, il stock le component vide dans le state componentToAdd
    const handleDropdownChange = (selectedOption) => {
        const selectedComponent  = componentsData.find((component) => component.id === selectedOption.value)
        setComponentToAdd({...selectedComponent});
    };

    // Fait une copie du tableau actuel de components crées, et lui ajoute le component vide qui est stocké dans componentToAdd
    const addNewComponent = () => {
        const tempArray = [...components];
        tempArray.push(componentToAdd);
        setComponents(tempArray);
        setAddComponent(false);
    };


    // Prend l'id du component a delete et le supprime
    const deleteComponent = (indexToDelete) => {
        const tempArray = [...components];
        tempArray.splice(indexToDelete, 1);
        setComponents(tempArray);
    }

  return (
    <div className='blog'>
        <Navbar />
        <div className="blog-content">
            {/* Condition qui verifie si un auteur est défini, si oui on peut creer le blog, sinon il faut entrer un auteur */}
            {isAuthor ?
            <>
                {/* Fait le tous du tableau components qui répresentes les components qu'on crées */}
                {components.map((component, index) => {
                    return (
                        <div key={index} className='component'>
                            {component.id === 1 && <Title title={component.title} isNew={true} onDelete={() => deleteComponent(index)} author={author} date="5 Juin 2023"/>}
                            {component.id === 2 && <Paragraphe text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos laboriosam sunt recusandae possimus officiis qui sequi, quos vel, rerum quisquam fuga quia placeat hic, impedit alias iusto quo quam nobis!"/>}
                        </div>
                    );
                })}

                {/* Vérifie si on a cliquer sur le + pour ajouter un component, si oui, afficher le dropdown */}
                {addComponent ? 
                    <>
                        <Dropdown options={componentsOptions} value={componentToAdd.value} onChange={handleDropdownChange} className="dropdown-components" placeholder="Sélectionner un bloc"/>
                        <button onClick={addNewComponent}>Ajouter</button>
                    </> 
                : 
                    <Button icon={faPlus} onClick={() => setAddComponent(true)}/>
                }
            </>
            :
                <>
                    {/* Le 'e' dans 'onChange={(e) => setAuthor(e.target.value)}' représente l'element duquel ce code s'execute, donc ici, on setAuthor sur la valeur de l'element en fesant e.target.value */}
                    <TextInput type="text" labelText="Qui écrit ce blog ?" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                    <Button text="Commencer" onClick={() => author ? setIsAuthor(true) : setIsAuthor(false)}/>
                </>
            }
        </div>
    </div>
  )
}

export default BlogEditor