import React, { useState } from 'react';
import '../CSS/components.css';

function QuestionFaq({ id, number, question, reponse }) {
  const [isRevealed, setIsRevealed] = useState(false);

  function toggleRadio() {
    setIsRevealed(!isRevealed);
  }

  return (
    <div className="faq--tab hidden bottom">
      <input
        type="radio"
        name="acc"
        id={id}
        onClick={toggleRadio}
        className={isRevealed ? 'revealTarif' : ''}
      />
      <label htmlFor={id}>
        <h3>{number}</h3>
        <h4>{question}</h4>
      </label>
      <div className="faq--content">
        <p>{reponse}</p>
      </div>
    </div>
  );
}

export default QuestionFaq;
