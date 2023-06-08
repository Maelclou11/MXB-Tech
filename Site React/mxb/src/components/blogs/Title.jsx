import { useState } from "react";
import "../../CSS/componentsBlog.css";
import { Button } from '../indexComponents';

function Title ({title, author, date, isNew}) {
    const [defaultTitle, setDefaultTitle] = useState('');
    const [isEditing, setIsEditing] = useState(isNew === true);

    return(
        <div className="BlogHeader">
            {!isNew ? <h1>{title}</h1> : isEditing ? '' : <h1>{defaultTitle}</h1>}
            {isNew && isEditing ?  
                <div className="edit-container">
                    <label htmlFor="">
                        Titre :
                        <input type="text" value={defaultTitle} onChange={(e) => setDefaultTitle(e.target.value)} />
                    </label>
                    <Button text="Sauvegarder" onClick={() => setIsEditing(false)}/>
                </div>
            :
                ''
            }
        </div>
    )
}
export default Title