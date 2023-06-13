import React, {useState} from 'react';
import { Navbar, Dropdown, Paragraphe, Title, Button, TextInput, TitreH2, LinkList, FullImage, TitreH3 } from '../components/indexComponents';
import '../CSS/BlogEditor.css';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function BlogEditor() {
    const [componentToAdd, setComponentToAdd] = useState([null]); // Contient le component VIDE que l'on a selectionner dans le dropdown
    const [components, setComponents] = useState([]);  // Liste de tous les components créés 
    const [addComponent, setAddComponent] = useState(false);  // Bool pour savoir si on a cliqué sur le + afin d'ajouter un component  (Nécessaire pour cacher le dropdown en cliquant sur le + et inversement (pour cacher le + quand on clique sur le dropdown))
    const [author, setAuthor] = useState('Mael');   // Le nom de l'auteur
    const [isAuthor, setIsAuthor] = useState(true);  // Pour faire disparaitre le form d'auteur lorsqu'on enregistre un nom

    // Dans un futur fetch de la DB
    const componentsData = [
        {id: 1, name: 'TitreH2', content: {titre: "", isNew: true, textId: ''}},
        {id: 2, name: 'TitreH3', content: {titre: "", isNew: true, textId: ''}},
        {id: 3, name: 'Paragraphe', content: {texte: "", isNew: true}},
        {id: 4, name: 'Liste de liens', content: [{text: '', link: '', isNew: true, children: []}]},
        {id: 5, name: 'Grande Image', content: {imageSrc: '', alt: '', imgHeight: '', imgWidth: '', isNew: true}},
    ];

    // Créer les options du dropdown donc   1) ...componentsData fait une copie du tableau componentsData   2) .map pour faire le tour des components   3) (component) sert a identifier du nom que tu veux chaque element du tableau 4) d'habitude on mets juste des parantheses '(component) => ()' mais etant donné qu'ont creer un objet(un tableau avec des champs et des valeur), Tous les objets doivent être dans des accolades donc le tableau qu'ont créer va ressembler a sa [{value: "1", label: "Title"}, {value: "2", label: "Paragraphe"}]
    const componentsOptions = [
        ...componentsData.map((component) => ({
            value: component.id,
            label: component.name
        })),
    ];

    // Lorsqu'on change la valeur du dropdown, il stock une copie du component vide dans le state componentToAdd et par la suite nous allons modifier sa valeur en le passant comme props au components associer a ce component vide, .find fait comme .map ou .filter sauf qu'il prend le premier component qui remplis la condition et non tous les elements qui la remplisse
    const handleDropdownChange = (selectedOption) => {
        const selectedComponent  = componentsData.find((component) => component.id === selectedOption.value)
        setComponentToAdd({...selectedComponent});
    };

    // Fait une copie du tableau actuel de components crées, et lui ajoute le component vide qui est stocké dans componentToAdd
    const addNewComponent = () => {
        if (componentToAdd.length > 0) {
            return;
        }
        const tempArray = [...components];
        tempArray.push(componentToAdd);
        setComponents(tempArray);
        setAddComponent(false);
        setComponentToAdd([null]);
    };


    // Prend l'id du component a delete et le supprime, prevComponents représente l'état précedent de ce state (sa brain mais en vrai c'est l'etat actuel qu'o prend et on la reset dans l'accolade comme ici sa me sert a delete le components selon l'index passer en parametre, le '.filter sert a prendre tous les components qui respecte la conditions et ne met pas ceux qui la brise donc quand l'index de l'element actuel est égale a 'indexToDelete' sa ne le met pas en ensuite sa set la valeur de mon etat components a ce nouveau tableau)
    const deleteComponent = (indexToDelete) => {
        setComponents(prevComponents => {
          return prevComponents.filter((_, index) => index !== indexToDelete);
        });
    };

    const updateComponent = (value, index) => {
        const tempArray = [...components];
        tempArray[index].content = value;
        setComponents(tempArray);
    };

  return (
    <div className='BlogEditor blog'>
        <Navbar isBlurry={false}/>
        <div className="blog-content">
            {/* Condition qui verifie si un auteur est défini, si oui on peut creer le blog, sinon il faut entrer un auteur */}
            {isAuthor ?
            <>
                <div className='component'>
                    <Title title="Ceci est le titre principale" isNew={false} author={author} date="5 Juin 2023"/>
                </div>
                {/* Fait le tour du tableau components qui répresentes les components qu'on crées et fait apparaitre le bon component selon le id de l'element */}
                        <div className='w-100'>
                        <DragDropContext onDragEnd={(param) => {
                            const srcI = param.source.index;
                            const desI = param.destination?.index; 
                            if(param.destination) {
                                const tempArray = [...components];
                                tempArray.splice(desI, 0, tempArray.splice(srcI, 1)[0]);
                                setComponents(tempArray);
                            }
                          }}
                        >
                        <Droppable droppableId='droppable-1'>
                            {(provided, _) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {components.map((component, index) => (
                                    <Draggable key={index} draggableId={'draggable-' + index} className="test" index={index}>
                                    {(provided, snapshot) => (
                                    <div key={index} className='component' ref={provided.innerRef} {...provided.draggableProps} style={{...provided.draggableProps.style, boxShadow: snapshot.isDragging? "0 0 .6rem #666" : "0px 0px 0px 0px rgba(161, 161, 161, 0.103)", background: snapshot.isDragging? '#fff' : ''}}>
                                        <div  {...provided.dragHandleProps}>
                                            <Button icon={faBars} className="btn-move" />
                                        </div>
                                        {component.id === 1 && <TitreH2 title={component.content.titre} textId={component.content.textId} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                        {component.id === 2 && <TitreH3 title={component.content.titre} textId={component.content.textId} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                        {component.id === 3 && <Paragraphe text={component.content.text} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                        {component.id === 4 && <LinkList listText={component.content} isNew={component.content[0].isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                        {component.id === 5 && <FullImage imageSrc={component.content.imageSrc} altImage={component.content.altImage} imgHeight={component.content.imgHeight} imgWidth={component.content.imgWidth} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}
                                    </div>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                            )}
                            </Droppable>
                        </DragDropContext>
                        </div>


                {/* Vérifie si on a cliquer sur le + pour ajouter un component, si oui, afficher le dropdown et cacher le bouton '+' */}
                {addComponent ? 
                    <>
                        <Dropdown options={componentsOptions} value={componentToAdd.value} onChange={handleDropdownChange} className="dropdown-components" placeholder="Sélectionner un bloc"/> {/* Du moment qu'on defini la value d'un element, on est obligé de mettre un onChange aussi sinon la valeur reste statique */}
                        <button onClick={addNewComponent}>Ajouter</button> {/* Appelle la fonction addNewComponent qui fait une copie du component vide selectionner dans le dropdown et lui sert de valeur initial pour son component respectif */}
                    </> 
                : 
                    <Button icon={faPlus} onClick={() => setAddComponent(true)} className="btn-add-component"/> 
                }
            </>
            :
                <>
                    {/* Le 'e' dans 'onChange={(e) => setAuthor(e.target.value)}' représente l'element duquel ce code s'execute, donc ici, on setAuthor sur la valeur de l'element en fesant e.target.value */}
                    <TextInput type="text" labelText="Qui écrit ce blog ?" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)}/>    {/* Dans le onChange, tu peux mettre des fonctions sans parametre sans avoir a mettre '() => ' mais dès qu'on met des parametre (en gros dès qui a des parenthese faut mettre "() => ") et si on veux faire plusieur fonction faut mettre les fonctions dans des accolades et mettre un point virgule entre les fonctions, exemple : () => {onDelete(); setIsEditing(false)} */}

                    <Button text="Commencer" onClick={() => author ? setIsAuthor(true) : setIsAuthor(false)}/>
                    {/* cela : "author ? setIsAuthor(true) : setIsAuthor(false)" sert juste a verifier que la valeur de author n'est pas nul et si elle l'est, ne pas faire disparaitre le form en cliquant donc oblige de rentrer un nom d'auteur mais en vrai jsp si on le met genre le monde s'en batte les couilles raides de qui l'a ecrit */} 
                </>
            }
            <Button text="Voir la liste de components" onClick={() => console.log("Components : ", components)} />
        </div>
    </div>
  )
}

export default BlogEditor