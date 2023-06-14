import React, { useRef, useState } from 'react';
import "../../CSS/componentsBlog.css";
import { Button, TextArea } from '../indexComponents';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import DOMPurify from 'dompurify';

function Paragraphe({ text, isNew, onDelete, index, onUpdate, isPreview }) {
  const [defaultText, setDefaultText] = useState(text);
  const [isEditing, setIsEditing] = useState(isNew === true);
  const textareaRef = useRef(null);

  const setText = () => {
    const sanitizedText = DOMPurify.sanitize(defaultText, { ALLOWED_TAGS: ['strong', 'a'] });
    setDefaultText(sanitizedText);
  };

  const handleSave = () => {
    setText();
    setIsEditing(false);
  };

  const addBold = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    const highlightedText = `<strong>${escape(selectedText)}</strong>`;

    const newText = textarea.value.replace(selectedText, highlightedText);
    setDefaultText(newText);

    // Mettre en évidence le texte dans le textarea
    textarea.setSelectionRange(
      textarea.selectionStart,
      textarea.selectionStart + highlightedText.length
    );
  };

  const addLink = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );

    const highlightedText = `<a href="#">${escape(selectedText)}</a>`;

    const newText = textarea.value.replace(selectedText, highlightedText);
    setDefaultText(newText);

    // Mettre en évidence le texte dans le textarea
    textarea.setSelectionRange(
      textarea.selectionStart,
      textarea.selectionStart + highlightedText.length
    );
  };

  return (
    <div className="ParagrapheBlog blog-components-frame">
      {!isNew && !isPreview ? (
        <p className="Paragraphe" dangerouslySetInnerHTML={{ __html: text }} />
      ) : isEditing ? (
        ''
      ) : text ? 
        <div className="blog-edit-component">
          <p className="Paragraphe" dangerouslySetInnerHTML={{ __html: text }} />
          <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
        </div>
        :
        <div className="blog-edit-component">
          <p className="Paragraphe" dangerouslySetInnerHTML={{ __html: defaultText }} />
        <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
        </div>
      }
      {isNew || isEditing ? (
        <div className="edit-container">
            <div className="row">
                <Button text="Mettre en gras" onClick={addBold}/>
                <Button text="Ajouter balise <a>" onClick={addLink}/>
            </div>
            <TextArea
                value={defaultText}
                onChange={(e) => setDefaultText(e.target.value)}
                ref={textareaRef}
            />
          <div className="btn-container">
            <Button
              text="Supprimer"
              className="red white"
              onClick={() => {
                onDelete();
                setIsEditing(false);
              }}
            />
            <Button text="Sauvegarder" className="c-main" onClick={() => {handleSave(); onUpdate({text: defaultText, isNew: false}, index) }} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Paragraphe;
