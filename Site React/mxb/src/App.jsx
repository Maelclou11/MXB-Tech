import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StatCircle from './components/StatCircle';
import Layout3D from './img/3D layout.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsTurnRight } from '@fortawesome/free-solid-svg-icons';

function App(){
    const afterImage = 'https://lirp.cdn-website.com/17e1aba9/dms3rep/multi/opt/G5-1920w.jpg'; 
    const beforeImage = 'https://lirp.cdn-website.com/17e1aba9/dms3rep/multi/opt/G6-1920w.jpg'; 
  return (
    <div>
        <Navbar />
        <main>
            <div className="home">

                <div className="accueil">
                    <div className="home-content">
                        <div className="home--text">
                            <p className='home-bande'><span>%</span> &nbsp; &nbsp;  90% Des Entreprise On Un Site Web</p>
                            <h1>Renouvler <span>Votre Façade</span> En Ligne.</h1>
                            <p>Avoir un site web de nos jour est devenu une norme et peut sembler compliquer. Chez MXB Tech, nous nous efforcons à rendre cela le plus simple possible pour vous créer un site web qui sauras vous épatez sans tous autant être dispendieux !</p>
                        </div>
                        <div className="home--btn">
                            <a href="#">
                                <FontAwesomeIcon icon={faArrowsTurnRight} />
                                <span>Commencer</span>
                            </a>
                        </div>
                    <div className="home-img">
                        <img src={Layout3D} alt="Image 3D d'un cellulaire" />
                    </div>
                    </div>
                </div>

                <div className='stat'>
                    <StatCircle stat="93%" text="Des Clients Satisfaits"/>
                    <StatCircle stat="93%" text="Des Clients Satisfaits"/>
                    <StatCircle stat="100%" text="Des Clients Satisfaits"/>
                </div>
            </div>
        </main>
    </div>
  )
};

export default App