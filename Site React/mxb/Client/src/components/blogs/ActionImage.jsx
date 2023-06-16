import { useState } from "react";
import { Button, TextArea, TextInput } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';

function ActionImage({text, imageSrc, altImage, imgHeight, imgWidth, isNew, onDelete, index, onUpdate, isPreview}) {
    const [defaultText, setDefaultText] = useState(text);
    const [isEditing, setIsEditing] = useState(isNew === true);
    const [imagePath, setImagePath] = useState(imageSrc);
    const [defaultAltImage, setDefaultAltImage] = useState(altImage);
    const [imageHeight, setImageHeight] = useState(imgHeight);
    const [imageWidth, setImageWidth] = useState(imgWidth);
    const [resize, setResize] = useState(false);
    const [useLink, setUseLink] = useState(false);
    const [link, setLink] = useState(imageSrc);

    const handleImageUpload = (event) => {
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
        onUpdate({imageSrc: useLink ? link : imagePath, alt: defaultAltImage, imgHeight: imageHeight, imgWidth: imageWidth, isNew: false}, index);
    };

  return (
    <div className="blog-components-frame ActionImage">
        {!isNew && !isPreview ? 
            <div>
                <ul>
                    <li>
                        {text}
                    </li>
                </ul>
                <div className='FullImage'>
                    <img src={imageSrc} alt={altImage} style={{height: `${imgHeight}px`, width: `${imgWidth}%`}}/> 
                </div>
            </div>
        : 
        isEditing ? '' : 
        text && imageSrc ?
            <div className="blog-edit-component">
                <ul>
                    <li>
                        {text}
                    </li>
                </ul>
                <div className='FullImage'>
                    <img src={imageSrc} alt={altImage} style={{height: `${imgHeight}px`, width: `${imgWidth}%`}}/>
                    <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
                </div>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
            </div>
        :
            <div className="blog-edit-component">
                <ul>
                    <li>
                        {defaultText}
                    </li>
                </ul>
                <div className='FullImage'>
                    <img src={useLink ? link : imagePath} alt={defaultAltImage} style={{height: `${imageHeight}px`, width: `${imageWidth}%`}}/>
                    <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
                </div>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
            </div>
        }
        {isNew || isEditing ?  
            <div className="edit-container">
                <div className="w-100">
                    <TextArea labelText="text" value={defaultText} onChange={(e) => setDefaultText(e.target.value)} />
                </div>
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
                    {resize ? 
                    <>
                        <div className="row">
                            <TextInput labelText="Hauteur de l'image :" type="range" value={imageHeight} onChange={(e) => setImageHeight(e.target.value)} max="500" min="0"/>
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
                    <Button text="Sauvegarder" className="c-main" onClick={() => {setIsEditing(false); onUpdate({text: defaultText, imageSrc: useLink ? link : imagePath, alt: defaultAltImage, imgHeight: imageHeight, imgWidth: imageWidth, isNew: false}, index)}}/>
                </div>
            </div>
        :
            ''
        }    
    </div>
  )
}

export default ActionImage