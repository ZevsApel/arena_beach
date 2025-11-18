'use client';

import { useState } from "react";
import BlockTitle from "../BlockTitle/BlockTitle";
import './FAQ.scss';

const FAQ = () => {
    const questions = [
        {
            question: 'Есть ли у вас бесплатный Wi-Fi?',
            answer: 'Да, для наших постояльцев предоставляется бесплатный Wi-Fi, включённый в состав услуг. Это позволяет удобно и комфортно оставаться на связи и пользоваться интернетом в любой части отеля.'
        },
        {
            question: 'Ресепшен круглосуточный?',
            answer: 'Да, для наших постояльцев предоставляется бесплатный Wi-Fi, включённый в состав услуг. Это позволяет удобно и комфортно оставаться на связи и пользоваться интернетом в любой части отеля.'
        },
        {
            question: 'Можно ли с собой домашних животных?',
            answer: 'Да, для наших постояльцев предоставляется бесплатный Wi-Fi, включённый в состав услуг. Это позволяет удобно и комфортно оставаться на связи и пользоваться интернетом в любой части отеля.'
        },
        {
            question: 'Какое время заселения и выезда?',
            answer: 'Да, для наших постояльцев предоставляется бесплатный Wi-Fi, включённый в состав услуг. Это позволяет удобно и комфортно оставаться на связи и пользоваться интернетом в любой части отеля.'
        },
        {
            question: 'Как найти территорию отеля?',
            answer: 'Да, для наших постояльцев предоставляется бесплатный Wi-Fi, включённый в состав услуг. Это позволяет удобно и комфортно оставаться на связи и пользоваться интернетом в любой части отеля.'
        },
    ];

    const [active, setActive] = useState<number | null>(null);

    const handleClick = (index: number) => {
        if (index === active) {
            setActive(null);
        } else {
            setActive(index);
        }

    }

    return (
        <div className="faq-container">
            <div className="faq-container__left">
                <BlockTitle>Часто задаваемые вопросы (FAQ)</BlockTitle>
                <img src='' alt='' />
            </div>
            <div className="faq-container__right">
                <div className="faq-block">
                    {questions.map((question, index) => (
                        <div className={`faq-item ${active === index ? 'faq-item__active' : ''}`} key={index}>
                            <div className="faq-title" onClick={() => { handleClick(index) }}>
                                {question.question}
                                <div className="faq-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                        <rect x="12.5" y="0.5" width="1" height="25" fill="#2D7B9E" stroke="#2D7B9E" />
                                        <rect x="25.5" y="12.5" width="1" height="25" transform="rotate(90 25.5 12.5)" fill="#2D7B9E" stroke="#2D7B9E" />
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                {question.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default FAQ;