import React, {useState} from 'react';
import { Navbar, Dropdown, Paragraphe, Title, Button, TextInput, TitreH2, LinkList, FullImage, TitreH3, ActionCode, ActionImage, TextArea } from '../components/indexComponents';
import '../CSS/BlogEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars, faChevronLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';
import { useNavigate } from 'react-router-dom';

function NewBlog() {
    const navigate = useNavigate();
    const [author, setAuthor] = useState('');   // Le nom de l'auteur
    const [isAuthor, setIsAuthor] = useState(false);  // Pour faire disparaitre le form d'auteur lorsqu'on enregistre un nom
    const [title, setTitle] = useState('');
    const [blogId, setBlogId] = useState('');
    const [data, setData] = useState('');
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const [date, setDate] = useState('');

    const createBlog = async () => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formatter = new Intl.DateTimeFormat('fr-FR', options);
        const today = new Date();
        setDate(formatter.format(today));
        setIsAuthor(true);
        axios.post("http://localhost:3308/blog/new", {
            title: title,
            author: author,
        }).then((response) => {
            setBlogId(response.data.id);
            navigate(`/blogeditor/${response.data.id}`);
        }).catch((error) => {
            console.error(error);
        })
    };

  return (
    <div className='BlogEditor blog'>
        <Navbar isBlurry={false}/>

        <div className="blog-content">
            <div className="back-to-dashboard">
                <Button icon={faChevronLeft} route="/blogdashboard" />
            </div>

                <TextInput type="text" labelText="Qui écrit ce blog ?" placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)}/>

                <TextInput type="text" labelText="Titre du blog" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <Button text="Commencer" onClick={() => {if(author && title) {createBlog();}}}/>
                <Button route='/blogdashboard' text="Blog Dashboard" />
        </div>
    </div>
)}

export default NewBlog;