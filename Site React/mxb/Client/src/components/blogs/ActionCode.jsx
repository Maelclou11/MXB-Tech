import { useState } from "react";
import { Button, Dropdown, TextArea } from '../indexComponents';
import { faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "@monaco-editor/react";

function ActionCode({text, code, language, isNew, onDelete, index, onUpdate, isPreview}) {
    const [defaultText, setDefaultText] = useState(text);
    const [defaultCode, setDefaultCode] = useState(code);
    const [isEditing, setIsEditing] = useState(isNew === true);
    const [defaultLanguage, setDefaultLanguage] = useState(language);
    const [isShow, setIsShow] = useState(true);
    const [copyBtnText, setCopyBtnText] = useState('Copier');
    
    const LanguageOptions = [
        {value: 'jsx', label: 'React'},
        {value: 'javascript', label: 'Javascript'},
        {value: 'html', label: 'HTML'},
        {value: 'css', label: 'CSS'},
        {value: 'powershell', label: 'Powershell'},
        {value: 'json', label: 'Json'},
        {value: 'bash', label: 'Bash/Shell'},
        {value: 'sql', label: 'sql'},
        {value: 'csharp', label: 'C#'},
        {value: 'php', label: 'php'},
        {value: 'cpp', label: 'C++'},
        {value: 'java', label: 'java'},
        {value: 'python', label: 'python'},
        {value: 'sass', label: 'sass'},
    ];

    const handleDropdownChange = (selectedOption) => {
        const selectedLanguage  = selectedOption;
        setDefaultLanguage(selectedLanguage);
    };

    const handleCopy = (content) => {
        navigator.clipboard.writeText(content)
        .then(() => {
            console.log('Code copied to clipboard:', content);
        })
        .catch((error) => {
            console.error('Failed to copy code:', error);
        });

        setCopyBtnText("Copié !");
        setTimeout(() => {
            setCopyBtnText("Copier");
        }, 1200);

    }

    const onChange = (newValue) => {
      setDefaultCode(newValue);
    }

  return (
    <div className="blog-components-frame ActionCode">
        {!isNew && !isPreview ? 
            <div>
                <ul>
                    <li>
                        {text}
                    </li>
                </ul>
                <div className={`code ${isShow ? '' : 'close'}`}>
                    <SyntaxHighlighter language={language} style={atomDark}>
                        {code}
                    </SyntaxHighlighter>
                    <div className="row btn-container">
                        <Button text={copyBtnText} className="btn-copy" onClick={() => handleCopy(code)}/>
                        <Button icon={isShow ? faMinus : faPlus} className="" onClick={() => setIsShow(!isShow)} />
                    </div>
                    <div className="see-more-btn">
                        {isShow ? '' : <Button icon={faPlus} text="Tout voir " className="see-more-bottom" onClick={() => setIsShow(!isShow)} />}
                    </div>
                </div>
            </div>
        : 
        isEditing ? '' : 
        text && language ?
            <div className="blog-edit-component">
                <ul>
                    <li>
                        {text}
                    </li>
                </ul>
                <div className={`code ${isShow ? '' : 'close'}`}>
                    <SyntaxHighlighter language={language} style={atomDark}>
                        {code}
                    </SyntaxHighlighter>
                    <div className="row btn-container">
                        <Button text={copyBtnText} className="" onClick={() => handleCopy(code)}/>
                        <Button icon={isShow ? faMinus : faPlus} className="" onClick={() => setIsShow(!isShow)} />
                    </div>
                    <div className="see-more-btn">
                        {isShow ? '' : <Button icon={faPlus} text="Tout voir " className="see-more-bottom" onClick={() => setIsShow(!isShow)} />}
                    </div>
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
                <div className={`code ${isShow ? '' : 'close'}`}>
                    <SyntaxHighlighter language={defaultLanguage.value} style={atomDark}>
                        {defaultCode}
                    </SyntaxHighlighter>
                    <div className="row btn-container">
                        <Button text={copyBtnText} className="" onClick={() => handleCopy(defaultCode)}/>
                        <Button icon={isShow ? faMinus : faPlus} className="" onClick={() => setIsShow(!isShow)} />
                    </div>
                    <div className="see-more-btn">
                        {isShow ? '' : <Button icon={faPlus} text="Tout voir " className="see-more-bottom" onClick={() => setIsShow(!isShow)} />}
                    </div>
                </div>
                <Button icon={faEdit} className="btn-edit-component" onClick={() => setIsEditing(true)} />
            </div>
        }
        {isNew || isEditing ?  
            <>
                {defaultLanguage || language ? 
                <div className="edit-container">
                    <div className="w-100">
                        <TextArea labelText="text" value={defaultText} onChange={(e) => setDefaultText(e.target.value)} />
                        <Editor
                            height="60vh"
                            width="100%"
                            theme="vs-dark"
                            defaultLanguage={defaultLanguage.value === 'jsx' ? 'javascript' : defaultLanguage.value}
                            value={defaultCode}
                            onChange={onChange}
                        />
                    </div>
                    <div className="btn-container">
                        {onDelete ? <Button text="Supprimer" className="red white" onClick={() => {onDelete(); setIsEditing(false)}}/> : ''}
                        <Button text="Sauvegarder" className="c-main" onClick={() => {setIsEditing(false); onUpdate({text: defaultText, code: defaultCode, language: defaultLanguage.value, isNew: false}, index)}}/>
                    </div>
                </div>
                :
                <Dropdown options={LanguageOptions} value={defaultLanguage} onChange={handleDropdownChange} placeholder="Sélectionner le language" />
                }
            </>
        :
            ''
        }    
    </div>
  )
}

export default ActionCode