
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogsDisplay from '../components/blogs/BlogsDisplay';

function PageBlog() {
    const blogUrl = useParams();
    const [blogContent, setBlogContent] = useState([]);
    const [hasFetch, setHasFetch] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3308/blog/${blogUrl.blogUrl}`)
        .then((response) => {
            const data = response.data
            setBlogContent(data);
            setHasFetch(true);
            console.log("VAGAIN", data);
        })
    }, [])

    return (
        <div>
            {hasFetch ? 
            <>
                <BlogsDisplay components={blogContent.components} />
            </>
            :
            ''}
            
        </div>
    )
}

export default PageBlog