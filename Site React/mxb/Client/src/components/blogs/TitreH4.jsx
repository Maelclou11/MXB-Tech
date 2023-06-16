import React, { useState } from 'react';

function TitreH4({titre}) {
    const [defaultTitre, setTitre] = useState(titre);
    const [isEditing, setIsEditing] = useState(true);

    

  return (
    <div>
        {isEditing ? 
        <>
            <input type="text" value={defaultTitre} onChange={(e) => setTitre(e.target.value)} />
            <button onClick={() => {setIsEditing(false);}}>Save</button>
        </>
        :
            <h4>{defaultTitre}</h4>
        }
    </div>
  )
}

export default TitreH4