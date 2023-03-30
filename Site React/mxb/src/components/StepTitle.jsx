import React, { useEffect } from 'react';

function StepTitle({ className, number, title, text }) {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          entry.target.classList.add('inView');
        } else {
          entry.target.classList.remove('inView');
        }
      });
    });
    const hiddenElements = document.querySelectorAll('.hidden_span');
    hiddenElements.forEach((el) => observer.observe(el));

    const hiddenElementsNumbers = document.querySelectorAll('.hidden_number');
    hiddenElementsNumbers.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className={`${className || ''} step`}>
        <div className="step--number">
            <span className='hidden_span'></span>
            <p className='hidden_number'>{number}</p>
            <h3 className='step--title'>{title}</h3>
        </div>
        <div className="step--text">
            <p>{text}</p>
        </div>
    </div>
  )
};

export default StepTitle;
