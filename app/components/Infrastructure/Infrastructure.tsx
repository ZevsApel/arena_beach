'use client';

import BlockTitle from "../BlockTitle/BlockTitle";
import './Infrastructure.scss';
import { useState } from "react";

const Infrastructure = () => {


    const infrastructureItems = [
        {
            name: 'Кинотеатр',
            img: '',
            feature: 'Уличный кинотеатр, кресла-груши',
            number: '01'
        },
        {
            name: 'Бассейн',
            img: '',
            feature: 'Взрослый/детский бассейн с подогревом',
            number: '02'
        },
        {
            name: 'Детская площадка',
            img: '/upload/infrastructure/rectangle-1442.jpg',
            feature: 'зона для детей',
            number: '03'
        },
        {
            name: 'Спортивное поле',
            img: '',
            feature: 'активный отдых и развлечения',
            number: '04'
        },
        {
            name: 'Пляж',
            img: '',
            feature: 'изолированный пляж',
            number: '05'
        },
        {
            name: 'Кафе и рестораны',
            img: '',
            feature: 'от восточной кухни до чая на дровах',
            number: '06'
        }
    ];

    const [hoveredIndex, setHoveredIndex] = useState(3);

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    }


    return (
        <div className="infrastructure-container">
            <div className="top-content">
                <BlockTitle>Инфраструктура отеля</BlockTitle>
                <p className="additional-text">Наша инфраструктура создана, чтобы каждый гость нашёл здесь своё идеальное место для отдыха и развлечений. Просторный бассейн и пляж для любителей воды, уличный кинотеатр для атмосферных вечеров, детская площадка и спортивное поле для активного времяпрепровождения. А разнообразие кафе и ресторанов порадует даже самых взыскательных гурманов.</p>
            </div>
            <div className="infrastructure-content">
                {infrastructureItems.map((item, index,) => (
                    <div 
                        className={`infrastructure-item ${hoveredIndex === index ? 'active' : ''}`} 
                        onMouseEnter={() => handleMouseEnter(index)} 
                    >
                        <div className="item-name" key={index}>
                            <p>{item.name}</p>
                        </div>
                        <img src={item.img} className="item-image" />
                        <div className="item-features">
                            {item.feature}
                        </div>
                        <div className="item-count">
                            {item.number}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Infrastructure;