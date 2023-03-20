import '../CSS/components.css';
import logo from '../img/Logo.png';

function Navbar() {

    const toggleMenu = () => {
        document.querySelector('.menu-hamburger').classList.toggle('is-open');
        document.querySelector('.navbar').classList.toggle('is-open');
        const links = document.querySelectorAll('.menu-mobile-list li');
        links.forEach((link) => {
            link.classList.toggle('fade');
        });

    };

    return (
        <nav className='navbar'>
            <img src={logo} alt="Logo MXB Tech" />
            <ul className="navbar-list">
                <li>ACCUEIL</li>
                <li>SERVICES</li>
                <li>RÉALISATIONS</li>
                <li>QUESTIONS</li>
                <li>NOUS JOINDRE</li>
            </ul>

            <div className='menu-hamburger' onClick={toggleMenu}>
                <div className='bars bar-1'></div>
                <div className='bars bar-2'></div>
                <div className='bars bar-3'></div>
            </div>

            <div className="menu-mobile">
                <img className='menu-mobile-logo' src={logo} alt="Logo MXB Tech" />
                <ul className="menu-mobile-list">
                    <li>ACCUEIL</li>
                    <li>SERVICES</li>
                    <li>RÉALISATIONS</li>
                    <li>QUESTIONS</li>
                    <li>NOUS JOINDRE</li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;