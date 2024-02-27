import React, { useState } from 'react';
import FaqImage from "../images/dr-michael-harris.jpg";
import { CiSquareMinus } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    { 
      question: 'What conditions do you specialize in treating', 
      answer: 'We specialize in a wide range of medical conditions, including but not limited to neurological disorders, orthopedic conditions, and various medical and surgical specialties. Our team of expert physicians is dedicated to providing comprehensive care across multiple disciplines', 
      isOpen: false 
    },


    { 
      question: 'How can I schedule an appointment?', 
      answer: 'Scheduling an appointment is easy. You can call our dedicated appointment line or use our online appointment booking system on the website. Our friendly staff is also available to assist you in finding a suitable time for your visit.', 
      isOpen: false 
    },


    { 
      question: 'What insurance plans do you accept?', 
      answer: 'We accept a variety of insurance plans to ensure accessibility for our patients. Please check our website or contact our billing department to verify if your insurance plan is accepted. We strive to make quality healthcare accessible to all.', 
      isOpen: false 
    },


    { 
      question: 'What safety measures are in place in light of COVID-19?', 
      answer: 'The safety and well-being of our patients are our top priorities. We have implemented strict COVID-19 safety protocols, including regular sanitization, social distancing measures, and the use of personal protective equipment. Telemedicine options are also available for certain consultations.', 
      isOpen: false 
    },

    { 
      question: 'Can I access my medical records online?', 
      answer: 'Yes, our patients have secure online access to their medical records through our patient portal. This allows you to review test results, schedule appointments, and communicate with your healthcare team conveniently from the comfort of your home.', 
      isOpen: false 
    },


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
        <img src={FaqImage} alt="FAQ" style={{borderRadius: '20px'}} />
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
