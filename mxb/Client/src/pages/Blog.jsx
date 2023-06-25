import React, { useEffect, useState } from 'react';
import { Navbar, Button } from '../components/indexComponents';
import axios from 'axios';
import '../CSS/Blog.css';
import moment from 'moment';
import 'moment/locale/fr';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function BlogDashbord() {
    const [blog, setBlog] = useState([]);
    const [isExtended, setIsExtended] = useState([]);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    useEffect(() => {
        axios.get("http://localhost:3308/blog/blog").then((response) => {
            console.log(response.data);
            setBlog(response.data);
            response.data.map((blog, index) => {
                return isExtended.push(false);
            });
            console.log(isExtended);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [])

    const deleteBlog = async(blogId, index) => {
        axios.delete(`http://localhost:3308/blog/delete/${blogId}`).then(() => {
            const updatedBlog = blog.filter((_, i) => i !== index);
            setBlog(updatedBlog);
        })
        .catch((error) => {
            console.error(error);
        })
    }

  return (
    <div className="BlogEditor blog Blog-frame">
        <Navbar />
        <div className="blog-content"> 
            <h1>Blogs informatiques</h1>
            <div className='blog-content2'>
                {blog.map((blog, index) => (
                    <div key={index} className='blog-carte-container'>
                        <div className='container image'>
                            <Link to={`/blogeditor/${blog.id}`}>
                                <span className='date-created'>{new Date(blog.createdAt).toLocaleDateString('fr-FR', options)}</span>
                                <div className="status-category">
                                    {blog.category ? <span className='status'>{blog.category}</span> : '' }
                                    <span className='status'>{blog.public ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</span>
                                </div>
                                <img src={`http://localhost:3308/blog/${blog.image}`} alt={blog.alt_image} />
                            </Link>
                        </div>
                        <div className="blog-carte-content">
                            <Link to={`/blogeditor/${blog.id}`}>
                                <h2>{blog.title}</h2>
                            </Link>
                            <div className="description-container">
                                <p className={`description ${isExtended[index] ? 'expanded' : ''} ${blog.description.length >= 150 ? 'hide' : ''}`}>{blog.description}</p>
                                {blog.description.length >= 150 ? <Button text={isExtended[index] ? `Voir moins` : 'Voir plus'} onClick={() => {const temp = [...isExtended]; temp[index] = !temp[index]; setIsExtended(temp);}} className="see-more-btn"/> : ''}
                            </div>
                            <div className="carteBlog-date">
                                <p> Dernière modification {moment(blog.updatedAt).locale('fr').fromNow()}</p>
                            </div>
                            <div className="btn-container">
                                {/* <Button route={`/blogeditor/${blog.id}`} text="Voir" /> */}
                                <Button route={`/blogeditor/${blog.id}`} text="Modifier" />
                                <Button text="Supprimer" className="delete-btn" onClick={() => deleteBlog(blog.id, index)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Button route='/blogeditor' text="Créer un blog" />
        </div>
    </div>
  )
}

export default BlogDashbord