import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StatCircle from './components/StatCircle';
import TitleSection from './components/TitleSection';
import IconBox from './components/IconBox';
import StepTitle from './components/StepTitle';
import Layout3D from './img/3D layout.png';
import webDesignIcon from './img/web_design_icon.svg';
import developpementIcon from './img/developpement_icon.svg';
import upRightArrow from './img/up_right_arrow.svg';
import upRightArrowPurple from './img/up_right_arrow_purple.svg';
import seoIcon from './img/seo_icon.svg';
import demoPlaneteGym from './img/demo_planetegym.png';
import demoEntretienGrondin from './img/demo_entretien_grondin1.png';
import demoCoteCour from './img/demo_restaurant_cote_cour.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsTurnRight, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App(){

    const [activePage, setActivePage] = useState(1);

    const handlePageButtonClick = (event) => {
      const pageNumber = parseInt(event.target.getAttribute('data-page-number'));
      setActivePage(pageNumber);
    }


  return (
    <div>
        <Navbar />
        <main>
            <div className="home">
                <div className="home-content">
                    <div className="home--textContainer">
                        <div className="home--text">
                            <p className='home-bande'><span>%</span> &nbsp; &nbsp;  90% Des Entreprise On Un Site Web</p>
                            <h1>Renouvler <span className='gradient-word'>Votre Façade</span> En Ligne.</h1>
                            <p>Avoir un site web de nos jour est devenu une norme et peut sembler compliquer. Chez MXB Tech, nous nous efforcons à rendre cela le plus simple possible pour vous créer un site web qui sauras vous épatez sans tous autant être dispendieux !</p>
                        </div>
                        <div className="home--btn">
                            <a className="button" href="#contactUs">
                                <img src={upRightArrow} alt="icon flèche" />
                                <span>Commencer</span>
                            </a>
                        </div>
                    </div>

                    <div className="home-img">
                        <img src={Layout3D} alt="Image 3D d'un cellulaire" />
                    </div>
                </div>

                <div className='stat'>
                    <StatCircle stat="93%" text="Des Clients Satisfaits"/>
                    <StatCircle stat="93%" text="Des Clients Satisfaits"/>
                    <StatCircle stat="100%" text="Des Clients Satisfaits"/>
                </div>

            </div>

            <section className='services' id='services'>
                <TitleSection aboveTitle="Nos Services" title="Ce que nous faisons de " specialWord="mieux"/>
                <div className="service-container">
                    <IconBox icon={webDesignIcon} title='Web Design' description='Vous méritez un site web qui représente pleinement votre entreprise et attire des clients potentiels.'/>
                    <IconBox icon={developpementIcon} title='Développement' description='Un sites web performants et fonctionnels qui utilise les dernières technologies pour offrir une expérience utilisateur optimale.'/>
                    <IconBox icon={seoIcon} title='SEO' description='Attirez plus de traffic et augmentez votre rendement en optimisant votre contenu ainsi que la structure de votre site web.'/>
                </div>


                <div className="process">
                    <h2 className='title-h2-l'>Notre manière de faire</h2>
                    <div className="process_content">
                    <StepTitle number="1" title="Planifier" text="Afin de représenter correctement votre entreprise, nous cherchons d'abord à discuter avec vous afin de vous connaitre vous, ainsi que votre entreprise et sont objectif principale avec nos services pour être certain de satisfaire vos attentes et vous donner le résultat escompté." />
                    

                    <StepTitle number="2" title="Créer" text="Cette phase consiste à vous créer ainsi que vous développer un site web sur mesure tout en s'assurant de votre satisfaction. À tous moments du processus nous nous assurons que votre avis sois pris en compte afin d'arriver à un résultat concluant ensemble." />
                    

                    <StepTitle number="3" title="Tester" text="Lorsque le site web arrive à sa phase final, nous le testons sur une multitude d'appareils afin de s'assurer qu'il n'aille aucune mauvaise surprise. Nous optimisons la performance au maximum afin d'assurer une expérience utilisateur optimale." />
                    </div>
                </div>

            </section>

            <section id='portfolio'>
                <TitleSection aboveTitle='Portfolio' title="Projets Réalisés"/>
                <p className='portfolio--text'>Notre portfolio de clients comprend une variété d'entreprises pour lesquelles nous avons réalisé des sites web sur mesure, allant des petites start-ups aux grandes entreprises internationales. Chaque projet a été conçu avec une approche unique pour répondre aux besoins spécifiques de chaque client.</p>

                <div className='pageSelector'>
                    <a className={activePage === 1 ? 'page page1 active' : 'page page1'} data-page-number="1" onClick={handlePageButtonClick} onTouchStart={handlePageButtonClick}>Page 1</a>
                    <a className={activePage === 2 ? 'middle-page page page2 active' : 'middle-page page page2'} data-page-number="2" onClick={handlePageButtonClick} onTouchStart={handlePageButtonClick}>Page 2</a>
                    <a className={activePage === 3 ? 'page page3 active' : 'page page3'} data-page-number="3" onClick={handlePageButtonClick} onTouchStart={handlePageButtonClick}>Page 3</a>
                </div>

                <div className="demo-work">
                    <div className={activePage === 1 ? 'pagework pagework1 active' : 'pagework pagework1'}>
                        <div className="imgContainer">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                                <a href="">Visiter le site</a>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={demoEntretienGrondin} alt="Entretien Grondin" />
                            <div className='text-image'>
                                <h3>Entretien Grondin</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={demoCoteCour} alt="Restaurant Côté-Cour" />
                            <div className='text-image'>
                                <h3>Restaurant Côté-Cour</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                    </div>

                    <div className={activePage === 2 ? 'pagework pagework2 active' : 'pagework pagework2'}>
                        <div className="imgContainer">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                    </div>

                    <div className={activePage === 3 ? 'pagework pagework3 active' : 'pagework pagework3'}>
                        <div className="imgContainer">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section id="contactUs">
                <div className="contact--title">
                    <h2>Nous Joindre</h2>
                    <h3>———— Une idée de projet ?</h3>
                </div>
                <div className="contact--content">
                    <div className="form">
                        <form action="">
                            <div className="button-services">
                                <p className='label-btn-services'>Que peut on faire pour vous ?</p>
                                <div className="button-servicesContainer">
                                    <label htmlFor='Design'>
                                        <input type="checkbox" name='service Design' id='Design'/>
                                        <span>Design</span>
                                    </label>
                                    <label htmlFor='developpement'>
                                        <input type="checkbox" name='service développement' id='developpement'/>
                                        <span>Développement</span>
                                    </label>
                                    <label htmlFor='SEO'>
                                        <input type="checkbox" name='service SEO' id='SEO'/>
                                        <span>SEO</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input">
                                    <label htmlFor="nom">Votre Nom</label>
                                    <input type="name" name='nom' id='nom' required/>
                                </div>
                                <div className="input">
                                    <label htmlFor="courriel">Votre Courriel</label>
                                    <input type="email" name='courriel' id='courriel' required/>
                                </div>
                            </div>

                            <div className='input'>
                                <label htmlFor="message">Résumé du projet</label>
                                <textarea name="Message" id="message" required></textarea>
                            </div>

                            <div className='btn-send'>
                                <input type="submit" value="Envoyer la demande " />
                                <img src={upRightArrowPurple} alt="icon flèche" />
                            </div>
                        </form>
                    </div>
                    <div className="contact--text">
                        <p>Chez MXB, nous sommes passionnés par la création de sites web exceptionnels qui reflètent l'image de votre entreprise et attirent votre public cible. Nous nous engageons à fournir des solutions de conception de sites web de qualité supérieure à des prix abordables, tout en offrant un service à la clientèle de premier ordre. Nous avons hâte de collaborer avec vous pour créer un site web sur mesure qui vous aidera à atteindre vos objectifs commerciaux. Contactez-nous dès maintenant pour discuter de vos besoins en matière de site web !</p>

                    </div>
                </div>
            </section>
        </main>
    </div>
  )
};

export default App