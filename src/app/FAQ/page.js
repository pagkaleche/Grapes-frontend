"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "./index.scss";
import { APIService } from "@/lib/APIService";
import { useAppSelector } from "@/store/store";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import './index.scss'; // Не забудь подключить стили

const faqData = [
    {
      question: 'How long does a tattoo take to heal?',
      answer: 'Tattoo healing usually takes from 2 to 4 weeks. During this time, it is important to properly care for the tattoo to avoid infections.'
    },
    {
      question: 'Can I wet my tattoo?',
      answer: 'For the first few days after getting a tattoo, avoid direct contact with water. Later, you can gently wash the tattoo, avoiding vigorous rubbing.'
    },
    {
      question: 'How should I care for my tattoo in the first few days?',
      answer: 'In the first few days, maintain hygiene, avoid touching the tattoo with dirty hands, and apply the recommended healing cream or ointment.'
    },
    {
      question: 'When can I exercise after getting a tattoo?',
      answer: 'It is recommended to avoid intense physical activities and sweating in the first few weeks after getting a tattoo. This helps to prevent irritation and infection.'
    },
    {
      question: 'What should I do if my tattoo starts itching?',
      answer: 'Itching is a normal part of the healing process, but try not to scratch the tattoo. Use a moisturizing cream and avoid exposure to sunlight.'
    }
  ];
  

function Healing() {
  const [openIndex, setOpenIndex] = useState(null); // Управление открытием вопросов

  const toggleAnswer = (index) => {
    // Если вопрос уже открыт, мы его закрываем, иначе открываем
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-header">Frequently Asked Questions about Tattoo Aftercare</h2>

      
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <span className="faq-question-text">{item.question}</span>
              <span className="faq-toggle">{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Root() {
    return (
      <Provider store={store}>
        <Healing />
      </Provider>
    );
  }
