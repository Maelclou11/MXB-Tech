import React, { useState, useEffect } from 'react';
import '../CSS/components.css';
import logo from '../img/Logo.png';

function Navbar() {
    const [isSticky, setIsSticky] = useState(false);

    const toggleMenu = () => {
        document.querySelector('.menu-hamburger').classList.toggle('is-open');
        document.querySelector('.navbar').classList.toggle('is-open');
        const links = document.querySelectorAll('.menu-mobile-list li');
        links.forEach((link) => {
            link.classList.toggle('fade');
        });
    };

    const handleScroll = () => {
        if (window.scrollY > 20) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <a href="#accueil">
                <img src={logo} alt="Logo MXB Tech" />
            </a>
            <ul className="navbar-list">
                <li><a href='#accueil'>ACCUEIL</a></li>
                <li><a href='#services'>SERVICES</a></li>
                <li><a href='#portfolio'>RÉALISATIONS</a></li>
                <li><a href='#questions'>QUESTIONS</a></li>
                <li><a href='#contactUs'>NOUS JOINDRE</a></li>
            </ul>

            <div className='menu-hamburger' onClick={toggleMenu}>
                <div className='bars bar-1'></div>
                <div className='bars bar-2'></div>
                <div className='bars bar-3'></div>
            </div>

            <div className="menu-mobile">
                <a href="#accueil" className='mobile-logo-a'>
                    <img className='menu-mobile-logo' src={logo} alt="Logo MXB Tech" />
                </a>
                <ul className="menu-mobile-list">
                    <li><a href='#accueil'>ACCUEIL</a></li>
                    <li><a href='#services'>SERVICES</a></li>
                    <li><a href='#portfolio'>RÉALISATIONS</a></li>
                    <li><a href='#questions'>QUESTIONS</a></li>
                    <li><a href='#contactUs'>NOUS JOINDRE</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;