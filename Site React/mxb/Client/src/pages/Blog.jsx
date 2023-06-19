import React, { useEffect, useState } from 'react'
import axios from 'axios';


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

    

  return (
    <div className="blog-content"> 
        {blog.map((blog, index) => (
            <div key={index}>
                <a href={`/blog/${blog.title}`}>{blog.title}</a>
                
            </div>
        ))}
    </div>
  )
}

export default BlogDashbord