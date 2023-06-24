import React, { useEffect, useState } from 'react';
import '../../CSS/components.css';
import logo from '../../img/Logo.png';
import {Button} from '../indexComponents';


function Navbar({isBlurry}) {
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
            document.querySelector('.navbar').classList.add('sticky');
            window.removeEventListener('scroll', handleScroll);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${isBlurry ? '' : 'notBlurry'}`}>
            <a href="#accueil">
                <img src={logo} alt="Logo MXB Tech" />
            </a>
            <ul className="navbar-list">
                <li><Button text="ACCUEIL" className="menu-item" route="/" /></li>
                <li><a href='#services'>SERVICES</a></li>
                <li><a href='#portfolio'>RÉALISATIONS</a></li>
                <li><Button text="BLOG" className="menu-item" route="/blogeditor" /></li>
                <li><a href='#contactUs'>NOUS JOINDRE</a></li>
            </ul>

            <div className='menu-hamburger' onClick={toggleMenu}>
                <div className='bars bar-1'></div>
                <div className='bars bar-2'></div>
                <div className='bars bar-3'></div>
            </div>

            <div className="menu-mobile">
                <ul className="menu-mobile-list">
                    <li><a href='#accueil' onClick={toggleMenu}>ACCUEIL</a></li>
                    <li><a href='#services' onClick={toggleMenu}>SERVICES</a></li>
                    <li><a href='#portfolio' onClick={toggleMenu}>RÉALISATIONS</a></li>
                    <li><a href='#questions' onClick={toggleMenu}>QUESTIONS</a></li>
                    <li><a href='#contactUs' onClick={toggleMenu}>NOUS JOINDRE</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;