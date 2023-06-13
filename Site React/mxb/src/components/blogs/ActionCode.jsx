import { useState } from "react";
import { Button, Dropdown, TextArea } from '../indexComponents';
import { faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../../App.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Editor from "@monaco-editor/react";

function ActionCode({text, code, language, isNew, onDelete, index, onUpdate, isPreview}) {
    const [defaultText, setDefaultText] = useState('');
    const [defaultCode, setDefaultCode] = useState('');
    const [isEditing, setIsEditing] = useState(isNew === true);
    const [defaultLanguage, setDefaultLanguage] = useState('');
    const [isShow, setIsShow] = useState(true);
    
    const LanguageOptions = [
        {value: 'jsx', label: 'React / jsx'},
        {value: 'html', label: 'html'},
        {value: 'css', label: 'css'},
        {value: 'javascript', label: 'javascript'},
        {value: 'bash', label: 'bash/shell'},
        {value: 'powershell', label: 'powershell'},
        {value: 'sql', label: 'sql'},
        {value: 'json', label: 'json'},
        {value: 'csharp', label: 'csharp'},
        {value: 'php', label: 'php'},
        {value: 'markdown', label: 'markdown'},
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
                <div className="code">
                    <SyntaxHighlighter language={language} style={atomDark}>
                        {code}
                    </SyntaxHighlighter>
                    <Button text="copier" className="btn-copy" onClick={() => handleCopy(code)}/>
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
                <div className={`code ${isShow ? '' : 'hidden'}`}>
                    <SyntaxHighlighter language={language} style={atomDark}>
                        {code}
                    </SyntaxHighlighter>
                    <div className="row btn-container">
                        <Button text="Copier" className="" onClick={() => handleCopy(code)}/>
                        <Button icon={isShow ? faMinus : faPlus} className="" onClick={() => setIsShow(!isShow)} />
                    </div>
                </div>
                <Button icon={faEdit} onClick={() => setIsEditing(true)} />
            </div>
        :
            <div className="blog-edit-component">
                <ul>
                    <li>
                        {defaultText}
                    </li>
                </ul>
                <div className={`code ${isShow ? '' : 'hidden'}`}>
                    <SyntaxHighlighter language={defaultLanguage.value} style={atomDark}>
                        {defaultCode}
                    </SyntaxHighlighter>
                    <div className="row btn-container">
                        <Button text="copier" className="" onClick={() => handleCopy(defaultCode)}/>
                        <Button icon={isShow ? faMinus : faPlus} className="" onClick={() => setIsShow(!isShow)} />
                    </div>
                </div>
                <Button icon={faEdit} onClick={() => setIsEditing(true)} />
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
                            defaultLanguage="javascript"
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
                <Dropdown options={LanguageOptions} value={defaultLanguage.value} onChange={handleDropdownChange} placeholder="Sélectionner le language" />
                }
            </>
        :
            ''
        }    
    </div>
  )
}

export default ActionCode