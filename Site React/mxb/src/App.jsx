import React, { useState, useEffect } from 'react';
import './App.css';
import ScrollProgressBar from 'react-scroll-progress-bar';
import {Navbar, StatCircle, TitleLeft, TitleSection, IconBox, StepTitle, ArrowUp, DevisGratuit, Animation, QuestionFaq} from './components/indexComponents';
import {Layout3D, webDesignIcon, developpementIcon, upRightArrow, upRightArrowPurple, seoIcon, demoPlaneteGym, demoEntretienGrondin, demoCoteCour, computerIcon, mxbIcon} from './img/indexImages';
import { send } from '@emailjs/browser';


function App(){
    /*#region   Portfolio */
    const [activePage, setActivePage] = useState(1);

    const handlePageButtonClick = (event) => {
      const pageNumber = parseInt(event.target.getAttribute('data-page-number'));
      setActivePage(pageNumber);
    }
    /* #endregion */
    /*#region   Animation étape */
    const handleScroll = () => {
        // Calculer la position verticale du centre de l'écran
        const centerY = window.pageYOffset + window.innerHeight / 2;
      
        // Sélectionner les éléments en fonction de leurs classes
        const elements = [
          document.querySelector('.step-1'),
          document.querySelector('.step-2'),
          document.querySelector('.step-3'),
        ];
      
        // Trouver l'élément le plus proche du centre de l'écran
        const closestIdx = elements.reduce((minIdx, el, idx) => {
          const currRect = el.getBoundingClientRect();
          const minRect = elements[minIdx].getBoundingClientRect();
          const currCenterY = window.pageYOffset + currRect.top + currRect.height / 2;
          const minCenterY = window.pageYOffset + minRect.top + minRect.height / 2;
      
          return Math.abs(centerY - currCenterY) < Math.abs(centerY - minCenterY) ? idx : minIdx;
        }, 0);
      
        // Définir un seuil pour déterminer si un élément est suffisamment proche du centre de l'écran
        const threshold = window.innerHeight / 4; // Ajustez cette valeur en fonction de vos besoins
      
        // Appliquer l'effet d'illumination à l'élément le plus proche s'il est suffisamment proche du centre de l'écran
        // et le retirer des autres
        elements.forEach((el, idx) => {
          const elRect = el.getBoundingClientRect();
          const elCenterY = window.pageYOffset + elRect.top + elRect.height / 2;
          const distanceFromCenter = Math.abs(centerY - elCenterY);
      
          if (idx === closestIdx && distanceFromCenter <= threshold) {
            el.classList.add('illuminated');
          } else {
            el.classList.remove('illuminated');
          }
        });
      };
      
      useEffect(() => {
        // Ajouter l'écouteur d'événements
        window.addEventListener('scroll', handleScroll);
      
        // Supprimer l'écouteur d'événements lors du nettoyage
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    /* #endregion */
    /*#region   Animation lors du rechargement de la page  */
    useEffect(() => {
        const storeScrollPosition = () => {
          localStorage.setItem('scrollPositionBeforeReload', window.pageYOffset);
        };
    
        const removeHiddenClasses = () => {
          const elements = document.querySelectorAll('.hidden');
          elements.forEach((element) => {
            element.classList.remove('hidden');
          });
        };
    
        // Ajouter un écouteur d'événement pour stocker la position de scroll avant le rechargement
        window.addEventListener('beforeunload', storeScrollPosition);
    
        // Récupérer la position de scroll stockée dans le localStorage
        const scrollPositionBeforeReload = parseInt(localStorage.getItem('scrollPositionBeforeReload'), 10);
    
        // Vérifier si la position de scroll avant le rechargement est en haut de la page
        if (!isNaN(scrollPositionBeforeReload) && scrollPositionBeforeReload > 500) {
          removeHiddenClasses();
        }
    
        // Supprimer l'écouteur d'événement lors du démontage du composant
        return () => {
          window.removeEventListener('beforeunload', storeScrollPosition);
        };
      }, []);
    /*#endregion  */
    /*#region   EmailJS  */
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const sendEmail = (e) => {
        e.preventDefault();

        setLoading(true);
    
        // Récupérer les services sélectionnés
        const services = [];
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                services.push(checkbox.name);
            }
        });

        // Vérifier si au moins un service est sélectionné
        if (services.length === 0) {
            const serviceErrorElement = document.querySelector('.service-error');
            serviceErrorElement.style.display = 'block';

            // Faire disparaître le message d'erreur après 3 secondes
            setTimeout(() => {
                serviceErrorElement.style.display = 'none';
            }, 3000);

            return;
        }
    
        // Préparer les données du formulaire
        const formData = {
            services: services.join(', '),
            nom: e.target.nom.value,
            courriel: e.target.courriel.value,
            message: e.target.message.value,
        };
    
        // Envoyer l'e-mail
        send('service_s6u3ql7', 'template_z8vik7n', formData, '2qDhWCOD2IpHJTBAX')

            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);

                // Réinitialiser le formulaire
                e.target.reset();

                // Afficher le message de succès
                setLoading(false);
                setIsSent(true);
                const successMessageElement = document.querySelector('.success-message');
                successMessageElement.style.display = 'block';

                // Faire disparaître le message de succès après 3 secondes
                setTimeout(() => {
                    successMessageElement.style.display = 'none';
                }, 3000);
            }, (err) => {
                console.log('FAILED...', err);
            });
    };
    /* #endregion */


  return (
    <div>
        <Animation />
        <ScrollProgressBar height="5px" bgcolor="#420983" />
        <ArrowUp />
        <Navbar />
        <main>
            <div id='accueil' className="home">
                <div className="home-content">
                    <div className="home--textContainer">
                        <div className="home--text">
                            <p className='home-bande hidden'><span>%</span> &nbsp; &nbsp;  90% Des Entreprises Ont Un Site Web</p>
                            <h1><span className='hidden'>Renouvler</span> <span className='gradient-word hidden'>Votre Façade</span> <span className='hidden'>En Ligne.</span></h1>
                            <p className='texte hidden'>Avoir un site web de nos jour est devenu une norme et peut sembler compliquer. Chez MXB Tech, nous nous efforcons à rendre cela le plus simple possible pour vous créer un site web qui sauras vous épatez sans tous autant être dispendieux !</p>
                        </div>
                        <div className="home--btn">
                            <a className="button hidden" href="#contactUs">
                                <img src={upRightArrow} alt="icon flèche" />
                                <span>Commencer</span>
                            </a>
                        </div>
                    </div>

                    <div className="home-img hidden">
                        <img src={Layout3D} alt="3D d'un cellulaire" />
                    </div>
                </div>

                <div className='stat hidden'>
                    <StatCircle stat="100%" text="Des Clients Satisfaits"/>
                    <StatCircle stat="100%" text="Des projets réussis"/>
                    <StatCircle stat="100%" text="Adapté pour mobile"/>
                </div>

            </div>

            <section id="besoindaide">
                <TitleLeft title="Besoin d'aide pour " />
                <div className='besoindaide__content'>
                    <div className="imgBox">
                        <img className="hidden bottom" src={computerIcon} alt="un ordinateur" />
                    </div>
                    <ul>
                        <li className='hidden right blur'>attirer de nouveaux clients avec votre site web actuel?</li>
                        <li className='hidden right blur d1'>mettre à jour et optimisé votre site pour les moteurs de recherche?</li>
                        <li className='hidden right blur d2'>donner un coup de jeune à votre site web? </li>
                        <li className='hidden right blur d3'>augmenter la visibilité de votre site à votre audience cible?</li>
                        <li className='hidden right blur d4'>à vous démarquer dans un marché encombré?</li>
                    </ul>
                </div>
                <div className="btn-devis hidden right d4">
                    <DevisGratuit />
                </div>
            </section>

            <section className='services' id='services'>
                <TitleSection aboveTitle="Nos Services" title="Ce que nous faisons de " specialWord="mieux"/>
                <div className="service-container">
                    <IconBox icon={webDesignIcon} title='Web Design' description='Vous méritez un site web qui représente pleinement votre entreprise et attire des clients potentiels.'/>
                    <IconBox icon={developpementIcon} title='Développement' description='Un sites web performants et fonctionnels qui utilise les dernières technologies pour offrir une expérience utilisateur optimale.'/>
                    <IconBox icon={seoIcon} title='SEO' description='Attirez plus de traffic et augmentez votre rendement en optimisant votre contenu ainsi que la structure de votre site web.'/>
                </div>


                <div className="process">
                    <TitleLeft title="Notre manière de faire" />
                    <div className="process_content">
                        <StepTitle number="1" title="Planifier" text="Afin de représenter correctement votre entreprise, nous cherchons d'abord à discuter avec vous afin de vous connaitre vous, ainsi que votre entreprise et sont objectif principale avec nos services pour être certain de satisfaire vos attentes et vous donner le résultat escompté." className="step-1" />
                        

                        <StepTitle number="2" title="Créer" text="Cette phase consiste à vous créer ainsi que vous développer un site web sur mesure tout en s'assurant de votre satisfaction. À tous moments du processus nous nous assurons que votre avis sois pris en compte afin d'arriver à un résultat qui vous " className="step-2" />
                        

                        <StepTitle number="3" title="Tester" text="Lorsque le site web arrive à sa phase final, nous le testons sur une multitude d'appareils afin de s'assurer qu'il n'aille aucune mauvaise surprise. Nous optimisons la performance au maximum afin d'assurer une expérience utilisateur optimale ainsi qu'un bon référencement dans les moteurs de recherche." className="step-3" />
                    </div>
                </div>

            </section>

            <section id='portfolio'>
                <TitleSection aboveTitle='Portfolio' title="Projets Réalisés"/>
                <p className='portfolio--text hidden'>Notre portfolio de clients comprend une variété d'entreprises pour lesquelles nous avons réalisé des sites web sur mesure, allant des petites start-ups aux grandes entreprises internationales. Chaque projet a été conçu avec une approche unique pour répondre aux besoins spécifiques de chaque client.</p>

                <div className='pageSelector hidden'>
                    <button className={activePage === 1 ? 'page page1 active' : 'page page1'} data-page-number="1" onClick={handlePageButtonClick} onTouchStart={handlePageButtonClick}>Page 1</button>
                    <button className={activePage === 2 ? 'middle-page page page2 active' : 'middle-page page page2'} data-page-number="2" onClick={handlePageButtonClick} onTouchStart={handlePageButtonClick}>Page 2</button>
                    <button className={activePage === 3 ? 'page page3 active' : 'page page3'} data-page-number="3" onClick={handlePageButtonClick} onTouchStart={handlePageButtonClick}>Page 3</button>
                </div>

                <div className="demo-work">
                    <div className={activePage === 1 ? 'pagework pagework1 active' : 'pagework pagework1'}>
                        <div className="imgContainer hidden">
                            <img src={demoPlaneteGym} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3>Planète Fitness Gym</h3>
                                <p>Design & Développement</p>
                                <a href="https://planetefitnessgym.qc.ca/">Visiter le site</a>
                            </div>
                        </div>
                        <div className="imgContainer hidden">
                            <img src={demoEntretienGrondin} alt="Entretien Grondin" />
                            <div className='text-image'>
                                <h3>Entretien Grondin</h3>
                                <p>Design & Développement</p>
                                <a href="https://entretiensgouttieresrivesud.ca/">Visiter le site</a>
                            </div>
                        </div>
                        <div className="imgContainer hidden">
                            <img src={demoCoteCour} alt="Restaurant Côté-Cour" />
                            <div className='text-image'>
                                <h3>Restaurant Côté-Cour</h3>
                                <p>Design & Développement</p>
                                <p className='coming-soon'>À venir</p>
                            </div>
                        </div>
                    </div>

                    <div className={activePage === 2 ? 'pagework pagework2 active' : 'pagework pagework2'}>
                        <div className="imgContainer">
                            <img src={mxbIcon} alt="planete fitness gym" />
                            <div className='text-image'>
                                <h3 className='coming-soon'>À Venir</h3>
                                <p></p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={mxbIcon} alt="planete fitness gym" />
                            <div className='text-image'>
                            <h3 className='coming-soon'>À Venir</h3>
                                <p></p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={mxbIcon} alt="planete fitness gym" />
                            <div className='text-image'>
                            <h3 className='coming-soon'>À Venir</h3>
                                <p></p>
                            </div>
                        </div>
                    </div>

                    <div className={activePage === 3 ? 'pagework pagework3 active' : 'pagework pagework3'}>
                        <div className="imgContainer">
                            <img src={mxbIcon} alt="planete fitness gym" />
                            <div className='text-image'>
                            <h3 className='coming-soon'>À Venir</h3>
                                <p></p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={mxbIcon} alt="planete fitness gym" />
                            <div className='text-image'>
                            <h3 className='coming-soon'>À Venir</h3>
                                <p></p>
                            </div>
                        </div>
                        <div className="imgContainer">
                            <img src={mxbIcon} alt="planete fitness gym" />
                            <div className='text-image'>
                            <h3 className='coming-soon'>À Venir</h3>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section id='questions' className='container__faq'>
                <TitleLeft title="Questions Fréquentes" />
                <QuestionFaq id="acc1" number="01" question="Quels types de sites web pouvez-vous créer?" reponse="Nous pouvons créer différents types de sites web, tels que des sites vitrines, des sites pour les petites entreprises ainsi que pour les grandes. Nous pouvons également créer une application spécifique pour faciliter la gestion de votre entreprise ou bien pour vendre vos services." />
                <QuestionFaq id="acc2" number="02" question="Faite vous du marketing web ?" reponse="Oui, nous offrons des services de SEO et même si vous ne le prenez pas, nous optimisons toujours au maximum les performances ainsi que le référencement naturel des sites web. Nous pouvons également vous aider à mettre en place votre compte google entreprise." />
                <QuestionFaq id="acc3" number="03" question="Utilisez vous des plateformes pour construire vos sites web tel que shopify, wixx, wordpress, etc?" reponse="Tous nos site web sont entièrement programmé à la main et spécifiquement pour vous ! Nous pouvons travailler avec une plateformes en particulier si vous avez besoins d'aide sur votre site actuel ou que vous désirez une plateforme spécifique." />
                <QuestionFaq id="acc4" number="04" question="Est-ce que vos site web sont adaptés pour mobile ?" reponse="Oui, nous créons des sites web entièrement 'responsive' qui s'adapte automatiquement à la taille de l'écran de l'utilisateur." />
            </section>

            <section id="contactUs">
                <div className="contact--title hidden">
                    <h2>Nous Joindre</h2>
                    <h3>———— Une idée de projet ?</h3>
                </div>
                <div className="contact--content">
                    <div className="form">

                        {loading ? 
                            <div className='loading-form'>
                                <div class="load-wrapp">
                                    <div class="load-3">
                                        <div class="line"></div>
                                        <div class="line"></div>
                                        <div class="line"></div>
                                    </div>
                                </div>
                                <p>Envoi de la demande...</p>
                            </div>
                        
                            :

                            <div className='container-form'>
                                {isSent ? 
                                    <div className="success-message">
                                        <div className="svg-container">
                                            <svg width="43" height="36" viewBox="0 0 43 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className="path-animate" fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M2 21.1113L4.5 19.1152L14.5 29.0957L24 17.6182L37.5 2.14844L41 4.14453L14.5 33.0879L2 21.1113Z" fill="rgba(255,255,255,0)"
                                                    stroke="#dec0fd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="110"
                                                    strokeDashoffset="110" />
                                            </svg>
                                        </div>
                                        <h2>La demande a été envoyée !</h2>
                                        <p>Nous allons vous répondre dans les plus brefs délais</p>
                                    </div>
                                :
                                    <form onSubmit={sendEmail}>
                                        <div className="button-services">
                                            <p className='label-btn-services hidden'>Que peut on faire pour vous ?</p>
                                            <div className="button-servicesContainer">
                                                <label htmlFor='Design' className='hidden'>
                                                    <input type="checkbox" name='service_design' id='Design'/>
                                                    <span>Design</span>
                                                </label>
                                                <label htmlFor='developpement' className='hidden'>
                                                    <input type="checkbox" name='service_developpement' id='developpement'/>
                                                    <span>Développement</span>
                                                </label>
                                                <label htmlFor='SEO' className='hidden'>
                                                    <input type="checkbox" name='service_seo' id='SEO'/>
                                                    <span>SEO</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input hidden">
                                                <label htmlFor="nom">Votre Nom</label>
                                                <input type="name" name='nom' id='nom' required/>
                                            </div>
                                            <div className="input hidden">
                                                <label htmlFor="courriel">Votre Courriel</label>
                                                <input type="email" name='courriel' id='courriel' required/>
                                            </div>
                                        </div>

                                        <div className='input hidden'>
                                            <label htmlFor="message">Résumé du projet</label>
                                            <textarea name="Message" id="message" required></textarea>
                                        </div>

                                        <p className="service-error" style={{ display: 'none', color: 'red' }}>
                                            Veuillez choisir au moins un service.
                                        </p>
                                        <div className='btn-send hidden'>
                                            <input type="submit" value="Envoyer la demande" />
                                            <img src={upRightArrowPurple} alt="icon flèche" />
                                        </div>
                                    </form>
                                }
                            </div>

                        }
                        
                    </div>
                    <div className="contact--text hidden">
                        <p>Chez MXB, nous sommes passionnés par la création de sites web exceptionnels qui reflètent l'image de votre entreprise et attirent votre public cible. Nous nous engageons à fournir des solutions de conception de sites web de qualité supérieure à des prix abordables, tout en offrant un service à la clientèle de premier ordre. Nous avons hâte de collaborer avec vous pour créer un site web sur mesure qui vous aidera à atteindre vos objectifs commerciaux. Contactez-nous dès maintenant pour discuter de vos besoins en matière de site web !</p>

                    </div>
                </div>
            </section>
        </main>
    </div>
  )
};
export default App