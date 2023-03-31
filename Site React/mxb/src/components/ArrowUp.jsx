import upRightArrow from '../img/up_right_arrow.svg';
import React, { useState, useEffect } from 'react';

const ArrowUp = () => {

  const [visible, setVisible] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className='arrow-top' onClick={scrollToTop} style={{display: visible ? 'flex' : 'none'}}>
      <img src={upRightArrow} alt="icon flèche" />
    </button>
  )
}

export default ArrowUp