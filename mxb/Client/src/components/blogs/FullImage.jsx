import React, { useState } from 'react';
import { Button, TextInput } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function FullImage({isNew, imageSrc, altImage, imgHeight, imgWidth, onDelete, index, onUpdate, isPreview, resizePossible }) {
    const [imagePath, setImagePath] = useState(imageSrc);
    const [image, setImage] = useState();
    const [defaultAltImage, setDefaultAltImage] = useState(altImage);
    const [imageHeight, setImageHeight] = useState(imgHeight);
    const [imageWidth, setImageWidth] = useState(imgWidth);
    const [isEditing, setIsEditing] = useState(isNew === true);
    const [resize, setResize] = useState(false);
    const [useLink, setUseLink] = useState(false);
    const [link, setLink] = useState('');

    const handleImageUpload = (event) => {
      setImage(event.target.files[0]);
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        setImagePath(reader.result); 
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const saveChange = ()  => {
        setIsEditing(false);
        if(!resizePossible) {
            onUpdate(imagePath, defaultAltImage, image);
        } else {
            onUpdate({imageSrc: useLink ? link : image, alt: defaultAltImage, imgHeight: imageHeight, imgWidth: imageWidth, isNew: false}, index);
        }
    };
  
    return (
      <div className='blog-components-frame'>
        {!isNew && !isPreview ?
        <div className="FullImage">
            <img src={`http://localhost:3308/blog/${imageSrc}`} alt={altImage} style={{height: `${imgHeight}px`, width: `${imgWidth}%`}}/> 
        </div>
        : isEditing ? 
        <div className='edit-container'>
            <div className="edit-content">
                <div className="row">
                    {useLink ? 
                        <TextInput labelText="Lien de l'image :" type="text" value={link} onChange={(e) => setLink(e.target.value)}/>
                    :
                        <TextInput labelText="Image :" type="file" onChange={handleImageUpload} />
                    }
                    <TextInput labelText="Alt de l'image :" type="text" value={defaultAltImage} onChange={(e) => setDefaultAltImage(e.target.value)}/>
                    <Button text={useLink ? 'Uploader une image' : 'Utiliser un lien comme source'} onClick={() => setUseLink(!useLink)} />
                </div>
                {resizePossible === false ? 
                    ''
                :
                    <>
                        {resize ? 
                        <>
                            <div className="row">
                                <TextInput labelText="Hauteur de l'image :" type="range" value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} max="1000" min="0"/>
                                <TextInput value={imageHeight + 'px'} readOnly={true}/>
                            </div>
                            <div className="row">
                                <TextInput labelText="Largeur de l'image :" type="range" value={imageWidth} onChange={(e) => setImageWidth(e.target.value)} max="100" min="0"/>
                                <TextInput value={imageWidth + '%'} readOnly={true}/>
                            </div>
                        </>
                        :
                            <Button text="Redimensioner l'image" onClick={() => setResize(true)} />
                        }
                    </>
                }

                {imagePath || link ? 
                    <>
                        <div className='FullImage'>
                            <img src={useLink ? link : imagePath} alt={defaultAltImage} style={{height: `${imageHeight}px`, width: `${imageWidth}%`}}/>
                        </div>
                    </>
                    :
                    ''
                }
            </div>
            <div className="btn-container">
                {onDelete ? <Button text="Supprimer" className="red white" onClick={() => {onDelete(); setIsEditing(false)}}/> : ''}
                <Button text="Sauvegarder" className="c-main" onClick={saveChange}/>
            </div>
        </div>
        
        : imageSrc ?
            <div className="blog-edit-component FullImage">
                <img src={!resizePossible ? imagePath : `http://localhost:3308/blog/${imageSrc}`} alt={altImage} style={{height: `${imgHeight}px`, width: `${imgWidth}%`}}/>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
                {/* <button onClick={() => console.log(imagePath)}>voir</button> */}
            </div>
            :
            <div className="blog-edit-component FullImage">
                <img src={useLink ? link : imagePath} alt={defaultAltImage} style={{height: `${imageHeight}px`, width: `${imageWidth}%`}}/>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
            </div>
        }
        {/* <button onClick={() => console.log(`isEditing: ${isEditing} || isNew: ${isNew} || isPreview: ${isPreview}`)}>Voir</button> */}
      </div>
    );
  };
  

export default FullImage