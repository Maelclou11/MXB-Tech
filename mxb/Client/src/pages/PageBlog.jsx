import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogsDisplay from '../components/blogs/BlogsDisplay';
import { Navbar, Button, Title } from '../components/indexComponents';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function PageBlog() {
    const blogUrl = useParams();
    const [blogContent, setBlogContent] = useState([]);
    const [hasFetch, setHasFetch] = useState(false);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    useEffect(() => {
        axios.get(`http://localhost:3308/blog/${blogUrl.blogUrl}`)
        .then((response) => {
            const data = response.data
            setBlogContent(data);
            setHasFetch(true);
            console.log(data);
        })
    }, [])

    return (
        <div className='BlogEditor blog'>
            <Navbar isBlurry={false}/>
            <div className="blog-content">
                <div className="back-to-dashboard">
                    <Button icon={faChevronLeft} route="/blogsinformatiques" />
                </div>
                {hasFetch ? 
                <>
                    <Title title={blogContent.title} isNew={false} author={blogContent.author} date={new Date(blogContent.createdAt).toLocaleDateString('fr-FR', options)} />
                    <BlogsDisplay components={blogContent.components} />
                </>
                :
                ''}
                </div>
            
        </div>
    )
}

export default PageBlog