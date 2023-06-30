import React, { useEffect, useState } from 'react';
import { TextArea, TextInput } from './indexComponents'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Comments(value) {

    const [comment, setComment] = useState("")
    const [username, setUsername] = useState("")
    const userId = useParams()
    
        
    const createComment = async(Comment, Username) => {
        axios.post("/create-comments").then((response) => {
            
    }).catch((error) => {
        console.error(error)
    })
    }

  return (
    <div>
        <TextInput value={username} onChange={(e) => setUsername}/>
        <TextArea value={comment} onChange={(e) => setComment}/>
        <button onClick={createComment}></button>
    </div>
  )
}

export default Comments