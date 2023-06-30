import React, {useState, useEffect} from 'react';
import { Navbar, Dropdown, Paragraphe, Title, Button, TextInput, TitreH2, LinkList, FullImage, TitreH3, ActionCode, ActionImage, TextArea, Comments } from '../components/indexComponents';
import '../CSS/BlogEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';

function BlogEditor() {
    const existingBlogId = useParams();
    const [componentToAdd, setComponentToAdd] = useState([null]); // Contient le component VIDE que l'on a selectionner dans le dropdown
    const [components, setComponents] = useState([]);  // Liste de tous les components créés
    const [addComponent, setAddComponent] = useState(false);  // Bool pour savoir si on a cliqué sur le + afin d'ajouter un component  (Nécessaire pour cacher le dropdown en cliquant sur le + et inversement (pour cacher le + quand on clique sur le dropdown))
    const [author, setAuthor] = useState('');   // Le nom de l'auteur
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
    const [isPublic, setIsPublic] = useState(false);
    const [data, setData] = useState('');
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const [isExtended, setIsExtended] = useState(false);
    const [saveMessage, setSaveMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const blogId = existingBlogId.existingBlogId;
        axios.get(`http://localhost:3308/blog/blog/${blogId}`)
          .then((response) => {
            const data = response.data;
            console.log(response.data);
            setComponents(data.components.map(component => ({
                ...component,
                content: JSON.parse(component.content)
              })));
            setAuthor(data.author);
            setTitle(data.title);
            setDate(new Date(data.createdAt).toLocaleDateString('fr-FR', options));
            setDescription(data.description);
            setImagePath(`http://localhost:3308/blog/${data.image}`);
            setImage(`http://localhost:3308/blog/${data.image}`);
            setAltImage(data.alt_image);
            setBlogId(data.id);
            setUrl(data.url);
            setIsPublic(data.public);
            if (data.category !== 'undefined' && data.category !== '' && data.category !== undefined && data.category !== null && data.category !== 'null') {
                const foundCategory = categoryData.find(item => item.name === data.category);
                foundCategory.value = foundCategory.categoryId;
                setCategory(foundCategory);
            }
            setData(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
    }, [])


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
        const componentToDeleteId = components[indexToDelete].id;
        console.log(componentToDeleteId);
        axios.delete(`http://localhost:3308/blog/delete/${componentToDeleteId}`);
        setComponents(prevComponents => {
          return prevComponents.filter((_, index) => index !== indexToDelete);
        });
    };

    const updateComponent = (value, index) => {
        const tempArray = [...components];
        tempArray[index].content = value;
        setComponents(tempArray);
    
        const component = tempArray[index];
        const data = new FormData();
        data.append('component', JSON.stringify(component));
        data.append('componentId', component.id);
        if(component.content.imageSrc) {
            data.append('image', component.content.imageSrc);
        }
    
        axios.put("http://localhost:3308/blog/update", data).then((response) => {
            const tempArray = [...components];
            tempArray[index].content = JSON.parse(response.data.content);
            setComponents(tempArray);
            console.log(tempArray);
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

    const updateBlog = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image); // where image is File object
        formData.append('alt_image', altImage);
        formData.append('url', url);
        formData.append('category', category.name ? category.name : '');
        formData.append('public', isPublic);
        
        axios.put(`http://localhost:3308/blog/save/${blogId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            setIsEditingDescription(false);
            setSaveMessage('Blog enregistré avec succès !');
            setTimeout(() => {
                setSaveMessage();
            }, 2000)
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const saveImageInfo = (imagePathToSave, altToSave, imageToSave) => {
        setImage(imageToSave);
        setAltImage(altToSave);
        setImagePath(imagePathToSave);
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
        console.log(category); 
        const selectedCategory  = categoryData.find((category) => category.categoryId === selectedOption.value)
        setCategory(selectedCategory);
    };
  return (
    <div className='BlogEditor blog'>
        <Navbar isBlurry={false}/>
        <div className="blog-content">
            <div className="back-to-dashboard">
                <Button icon={faChevronLeft} route="/blogdashboard" />
            </div>
            {isLoading ? 
            <>
                <div className="loading">
                    <h2>Chargement...</h2>
                    <span className='loading-circle'>
                        <span className='inner-circle'></span>
                    </span>
                </div>
            </>
            :
            <>
                <div className='component'>
                    <Title title={title} isNew={true} author={author} date={date} onSave={setTitle}/>
                </div>
                
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
                                        {component.componentId === 1 && <TitreH2 title={component.content.titre} textId={component.content.textId} isNew={component.content.isNew} onDelete={() => deleteComponent(index)} onUpdate={updateComponent} index={index} isPreview={true} isPenis="dsdsdsd" />}

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
                    <Comments/>
                </div>

                {addComponent ? 
                    <>
                        <Dropdown options={componentsOptions} value={componentToAdd.value} onChange={handleDropdownChange} className="dropdown-components" placeholder="Sélectionner un bloc"/> {/* Du moment qu'on defini la value d'un element, on est obligé de mettre un onChange aussi sinon la valeur reste statique */}
                        <button onClick={addNewComponent}>Ajouter</button> {/* Appelle la fonction addNewComponent qui fait une copie du component vide selectionner dans le dropdown et lui sert de valeur initial pour son component respectif */}
                    </> 
                : 
                    <Button icon={faPlus} onClick={() => setAddComponent(true)} className="btn-add-component"/> 
                }

                {isEditingDescription ? 
                <>
                    <div className="edit-detail-container">
                        <div className="edit-details">
                            <TextArea value={description} labelText="Description (texte affiché sur les cartes blogs)" onChange={(e) => setDescription(e.target.value)} className="min-height-250"/>
                            <TextInput value={url} labelText="URL du blog" onChange={(e) => setUrl(e.target.value)} className="url-input" />
                            <div className="row">
                                <Dropdown value={category.value} options={categoryOption} onChange={handleDropdownCategory} placeholder="Choisir une catégorie" className="dropdown" />
                                <Button text={isPublic ? 'Mettre Privé' : 'Mettre Public'} onClick={() => setIsPublic(!isPublic)}/>
                            </div>
                            <div className="component image-blog">
                                <FullImage imageSrc={image} altImage={altImage} isNew={true} onUpdate={saveImageInfo} isPreview={true} resizePossible={false} /* imgHeight={300} imgWidth={50} */ />
                            </div>
                        </div>
                        <div className="preview-card">
                            <h2 className='mb-2 font-size-1 font-weight-400 bg-color'>Preview de la carte :</h2>
                            <div className='blog-carte-container'>
                                <div className='container image'>
                                        <span className='date-created'>{new Date(data.createdAt).toLocaleDateString('fr-FR', options)}</span>
                                        <div className="status-category">
                                            {category ? <span className='status'>{category.name}</span> : '' }
                                            <span className='status'>{isPublic ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</span>
                                        </div>
                                        <img src={imagePath} alt={altImage} />
                                </div>
                                <div className="blog-carte-content">
                                    <h2>{title}</h2>
                                    <div className="description-container">
                                        <p className={`description ${isExtended ? 'expanded' : ''} ${description.length >= 150 ? 'hide' : ''}`}>{description}</p>
                                        {description.length >= 150 ? <Button text={isExtended ? `Voir moins` : 'Voir plus'} onClick={() => { setIsExtended(!isExtended)}} className="see-more-btn"/> : ''}
                                    </div>
                                    <div className="carteBlog-date">
                                        <p> Dernière modification {moment(data.updatedAt).locale('fr').fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Button text="Annuler" className="save-btn" onClick={() => setIsEditingDescription(false)}/>
                        <Button text="Enregistrer" className="save-btn" onClick={updateBlog} />
                        {/* <Button text="Voir catégorie" onClick={() => console.log(category)} /> */}
                    </div>
                </>
                :
                <>
                    <div className="row">
                        <Button text={description ? 'Modifier les détails' : 'Ajouter les informations de la carte du blog'} onClick={() =>  setIsEditingDescription(true)} className="save-btn"/>
                        <Button text="Enregistrer le blog" className="save-btn" onClick={updateBlog} />
                    </div>
                    {saveMessage ? <p className='success-message '>{saveMessage}</p> : ''}
                </>
                }
            </>
            }
        </div>
    </div>
  )
}

export default BlogEditor

