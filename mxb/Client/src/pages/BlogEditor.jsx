import React, {useState} from 'react';
import { Navbar, Dropdown, Paragraphe, Title, Button, TextInput, TitreH2, LinkList, FullImage, TitreH3, ActionCode, ActionImage, TextArea } from '../components/indexComponents';
import '../CSS/BlogEditor.css';
import { faPlus, faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useParams } from 'react-router-dom';

function BlogEditor() {
    const existingBlogId = useParams();
    const [componentToAdd, setComponentToAdd] = useState([null]); // Contient le component VIDE que l'on a selectionner dans le dropdown
    const [components, setComponents] = useState([]);  // Liste de tous les components créés
    const [addComponent, setAddComponent] = useState(false);  // Bool pour savoir si on a cliqué sur le + afin d'ajouter un component  (Nécessaire pour cacher le dropdown en cliquant sur le + et inversement (pour cacher le + quand on clique sur le dropdown))
    const [author, setAuthor] = useState('');   // Le nom de l'auteur
    const [isAuthor, setIsAuthor] = useState(false);  // Pour faire disparaitre le form d'auteur lorsqu'on enregistre un nom
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [image, setImage] = useState('');
    const [altImage, setAltImage] = useState('');
    const [blogId, setBlogId] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const [hasFetch, setHasFetch] = useState(false);

    if (existingBlogId.length !== 0 && !hasFetch) {
        const blogId = existingBlogId.existingBlogId;
        axios
          .get(`http://localhost:3308/blog/blog/${blogId}`)
          .then((response) => {
            console.log(response.data);
            const data = response.data;
            setComponents(data.components.map(component => ({
                ...component,
                content: JSON.parse(component.content)
              })));
            setAuthor(data.author);
            setIsAuthor(true);
            setTitle(data.title);
            setDate(data.createdAt);
            setDescription(data.description);
            setImagePath(data.image);
            setImage(`http://localhost:3308/blog/${data.image}`);
            setAltImage(data.alt_image);
            setBlogId(data.id);
            setUrl(data.url);
            setHasFetch(true);

          })
          .catch((error) => {
            console.error(error);
          });
      }

    const componentsData = [
        {componentId: 1, name: 'Titre H2', content: {titre: "", isNew: true, textId: ''}},
        {componentId: 2, name: 'Titre H3', content: {titre: "", isNew: true, textId: ''}},
        {componentId: 3, name: 'Paragraphe', content: {texte: "", isNew: true}},
        {componentId: 4, name: 'Liste de liens', content: [{text: '', link: '', isNew: true, children: []}, {text: '', link: '', children: []}]},
        {componentId: 5, name: 'Grande Image', content: {imageSrc: '', alt: '', imgHeight: '', imgWidth: '', isNew: true}},
        {componentId: 6, name: 'Action Code', content: {text: '', code: '', isNew: true}},
        {componentId: 7, name: 'Action Image', content: {text: '', imageSrc: '', alt: '', imgHeight: '', imgWidth: '', isNew: true}},
        {componentId: 8, name: 'Titre H4', content: {titre: "", isNew: true, textId: ''}},
    ];

    // Créer les options du dropdown donc   1) ...componentsData fait une copie du tableau componentsData   2) .map pour faire le tour des components   3) (component) sert a identifier du nom que tu veux chaque element du tableau 4) d'habitude on mets juste des parantheses '(component) => ()' mais etant donné qu'ont creer un objet(un tableau avec des champs et des valeur), Tous les objets doivent être dans des accolades donc le tableau qu'ont créer va ressembler a sa [{value: "1", label: "Title"}, {value: "2", label: "Paragraphe"}]
    const componentsOptions = [
        ...componentsData.map((component) => ({
            value: component.componentId,
            label: component.name
        })),
    ];

    // Lorsqu'on change la valeur du dropdown, il stock une copie du component vide dans le state componentToAdd et par la suite nous allons modifier sa valeur en le passant comme props au components associer a ce component vide, .find fait comme .map ou .filter sauf qu'il prend le premier component qui remplis la condition et non tous les elements qui la remplisse
    const handleDropdownChange = (selectedOption) => {
        const selectedComponent  = componentsData.find((component) => component.componentId === selectedOption.value)
        setComponentToAdd({...selectedComponent});
        console.log(selectedComponent)
    };

    // Fait une copie du tableau actuel de components crées, et lui ajoute le component vide qui est stocké dans componentToAdd
    const addNewComponent = () => {
        if (componentToAdd.length > 0) {
            return;
        }
        const tempArray = [...components];
        tempArray.push(componentToAdd);
        setComponents(tempArray);
        createComponent(componentToAdd);

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

        const component = tempArray[index];
        axios.put("http://localhost:3308/blog/update", {component}).then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    };

    const createComponent = async (componentToAdd) => {
        const component = componentToAdd;
        axios.post("http://localhost:3308/blog/save-component", {component, blogId}).then((response) => {
            console.log(response.data);
            setComponents(prevComponents => {
                return prevComponents.map((component, index) => {
                  if (index === prevComponents.length - 1) {
                    return { ...component, id: response.data };
                  }
                  return component;
                });
              });
        })
        .catch((error) => {
            console.error(error);
          });
    }

    const createBlog = async () => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formatter = new Intl.DateTimeFormat('fr-FR', options);
        const today = new Date();
        setDate(formatter.format(today));
        setIsAuthor(true);
        console.log(author);
        axios.post("http://localhost:3308/blog/new", {
            title: title,
            author: author,
        }).then((response) => {
            setBlogId(response.data.id);
        }).catch((error) => {
            console.error(error);
        })
    };

    const updateBlog = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image); // where image is File object
        formData.append('alt_image', altImage);
        formData.append('url', url);
        formData.append('category', category.name);
        
        axios.put(`http://localhost:3308/blog/save/${blogId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const saveImageInfo = (imagePathToSave, altToSave, imageToSave) => {
        setImage(imageToSave);
        setAltImage(altToSave);
        setImagePath(imagePathToSave);
        console.log("ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",imagePath, altImage, image);
    };

    const categoryData = [
        {categoryId: 1, name: 'JavaScript'},
        {categoryId: 2, name: 'C++'},
        {categoryId: 3, name: 'Python'},
        {categoryId: 4, name: 'CSharp'},
        {categoryId: 5, name: 'React'},
        {categoryId: 6, name: 'NodeJs'},
        {categoryId: 7, name: 'AI'},
        {categoryId: 8, name: 'WordPress'},
    ]

    const categoryOption = [
        ...categoryData.map((category) => ({
            value: category.categoryId,
            label: category.name    
        }))
    ]

    const handleDropdownCategory = (selectedOption) => {
        const selectedCategory  = categoryData.find((category) => category.categoryId === selectedOption.value)
        setCategory(selectedCategory)
        console.log(category) 
    };
  return (
    <div className='BlogEditor blog'>
        <Navbar isBlurry={false}/>
        <div className="blog-content">
            <div className="back-to-dashboard">
                <Button icon={faChevronLeft} route="/blogdashboard" />
            </div>
            {isAuthor ?
                <>
                    <div className='component'>
                        <Title title={title} isNew={true} author={author} date={date} onSave={setTitle}/>
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
                                        <div key={index} className='component' ref={provided.innerRef} {...provided.draggableProps} style={{...provided.draggableProps.style, boxShadow: snapshot.isDragging? "0 0 .6rem #666" : "", background: snapshot.isDragging? '#fff' : ''}}>
                                            <div  {...provided.dragHandleProps} className='btn-move-container'>
                                                <Button icon={faBars} className="btn-move" />
                                            </div>
                                            {component.componentId === 1 && <TitreH2 title={component.content.titre} textId={component.content.textId} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true} /> }

                                            {component.componentId === 2 && <TitreH3 title={component.content.titre} textId={component.content.textId} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                            {component.componentId === 3 && <Paragraphe text={component.content.text} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                            {component.componentId === 4 && <LinkList listText={component.content} isNew={component.content[0].isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                            {component.componentId === 5 && <FullImage imageSrc={component.content.imageSrc} altImage={component.content.altImage} imgHeight={component.content.imgHeight} imgWidth={component.content.imgWidth} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true} resizePossible={true}/>}

                                            {component.componentId === 6 && <ActionCode text={component.content.text} code={component.content.code} language={component.content.language} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}

                                            {component.componentId === 7 && <ActionImage text={component.content.text} imageSrc={component.content.imageSrc} altImage={component.content.altImage} imgHeight={component.content.imgHeight} imgWidth={component.content.imgWidth} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true}/>}
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
                            <button onClick={() => { addNewComponent() }}>Ajouter</button> {/* Appelle la fonction addNewComponent qui fait une copie du component vide selectionner dans le dropdown et lui sert de valeur initial pour son component respectif */}
                        </> 
                    : 
                        <Button icon={faPlus} onClick={() => setAddComponent(true)} className="btn-add-component"/> 
                    }

                    {isEditingDescription ? 
                        <>
                            <TextArea value={description} labelText="Description (texte affiché sur les cartes blogs)" onChange={(e) => setDescription(e.target.value)}/>
                            <TextInput value={url} labelText="URL du blog" onChange={(e) => setUrl(e.target.value)} />
                            <Dropdown  value={category.value} options={categoryOption} onChange={handleDropdownCategory} placeholder="Choisir une catégorie"  />
                            <FullImage imageSrc={imagePath} altImage={altImage} isNew={true} onUpdate={saveImageInfo} isPreview={true} resizePossible={false} imgHeight={300} imgWidth={50} />
                            <div className="row">
                                <Button text="Annuler" className="save-btn" onClick={() => setIsEditingDescription(false)}/>
                                <Button text="Enregistrer le blog" className="save-btn" onClick={updateBlog} />
                            </div>
                        </>
                    :
                        <Button text={description ? 'Modifier les infos' : 'Ajouter les informations de la carte du blog'} onClick={() =>  setIsEditingDescription(true)} className="save-btn"/>
                    }
                </>
            :
                <>
                    {/* Le 'e' dans 'onChange={(e) => setAuthor(e.target.value)}' représente l'element duquel ce code s'execute, donc ici, on setAuthor sur la valeur de l'element en fesant e.target.value */}
                    <TextInput type="text" labelText="Qui écrit ce blog ?" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)}/>    {/* Dans le onChange, tu peux mettre des fonctions sans parametre sans avoir a mettre '() => ' mais dès qu'on met des parametre (en gros dès qui a des parenthese faut mettre "() => ") et si on veux faire plusieur fonction faut mettre les fonctions dans des accolades et mettre un point virgule entre les fonctions, exemple : () => {onDelete(); setIsEditing(false)} */}

                    <TextInput type="text" labelText="Titre du blog" value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <Button text="Commencer" onClick={author && title ? createBlog : ''}/>
                    <Button route='/blogdashboard' text="Blog Dashboard" />
                    {/* cela : "author ? setIsAuthor(true) : setIsAuthor(false)" sert juste a verifier que la valeur de author n'est pas nul et si elle l'est, ne pas faire disparaitre le form en cliquant donc oblige de rentrer un nom d'auteur mais en vrai jsp si on le met genre le monde s'en batte les couilles raides de qui l'a ecrit */} 
                </>
            }
        </div>
    </div>
  )
}

export default BlogEditor