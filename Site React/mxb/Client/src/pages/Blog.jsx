import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../CSS/Blog.css';

function BlogDashbord() {
    const [blog, setBlog] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3308/blog/blog").then((response) => {
            console.log(response.data);
            setBlog(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [])

    const adresseImg = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F3c%2FIMG_logo_%25282017%2529.svg&tbnid=BD1Mn-7CrhkJeM&vet=12ahUKEwjIxqPO8dX_AhWcJFkFHTHSCNQQMygAegUIARDEAQ..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FIMG_(company)&docid=TuPHa6zZOTIdYM&w=1401&h=565&q=img&ved=2ahUKEwjIxqPO8dX_AhWcJFkFHTHSCNQQMygAegUIARDEAQ"

  return (
    <div className="blog-content "> 
    <h1>Blogs informatiques</h1>
        <div className='blog-content2'>
            {blog.map((blog, index) => (
                <div key={index} className='blog-carte-container'>
                    <div className='container image'></div>
                    <h2>{blog.title}</h2>
                    <p>{blog.description}</p>
                    <a href={`/blog/${blog.title.replace(/\s/g, "")}`}>Voir plus</a>
                    <div className="carteBlog-date">
                        <p> Créé le {blog.createdAt}</p>
                        <p> Dernière modification le {blog.updatedAt}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BlogDashbord