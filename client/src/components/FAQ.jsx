import React, { useState } from 'react';
import FaqImage from "../images/faq-img.png";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.', isOpen: false },
    { question: 'How to install React?', answer: 'You can install React using npm or yarn.', isOpen: false },
    { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.', isOpen: false },
    { question: 'How to install React?', answer: 'You can install React using npm or yarn.', isOpen: false },
    // Add more FAQ items as needed
  ]);

  const toggleAnswer = (index) => {
    const updatedFaqs = faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false,
    }));
    setFaqs(updatedFaqs);
  };

  return (
    <div className='faq'>
      <div className='left-part'>
        <img src={FaqImage} alt="FAQ" />
      </div>
      <div className='right-part'>
        <div className="faq-container">
          <h2>Most questions by our beloved Patients</h2>
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${faq.isOpen ? 'open' : ''}`}>
              <div className="question" onClick={() => toggleAnswer(index)}>
                {faq.question}
                {faq.isOpen ? (
                  <CiSquareMinus className='icon' />
                ) : (
                  <CiSquarePlus className='icon' />
                )}
              </div>
              {faq.isOpen && <div className="answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
