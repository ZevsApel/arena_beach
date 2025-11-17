'use client';

import { useCallback, useState } from "react";
import './Slider.scss';

interface Slide {
    id: number;
    image: string;
    alt: string;
}

interface ImageSliderProps {
    slides: Slide[];
}

const Slider: React.FC<ImageSliderProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;
    const slidesToShow = 4; // Показывать по 4 слайда

    const nextSlide = useCallback(() => {
        // Проверяем, можно ли пролистнуть дальше
        if (currentSlide < slides.length - slidesToShow) {
            setCurrentSlide(prev => prev + 1);
        } else {
            // Если дошли до конца - возвращаемся к началу
            setCurrentSlide(0);
        }
    }, [currentSlide, slides.length, slidesToShow]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        } else {
            // Если в начале - переходим к концу
            setCurrentSlide(slides.length - slidesToShow);
        }
    }, [currentSlide, slides.length, slidesToShow]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    }

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const onTouchEnd = () => {
        if(!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if(isLeftSwipe) {
            nextSlide();
        } else if(isRightSwipe) {
            prevSlide();
        }
    }

    return(
        <div className="slider-container">
            <div 
                className="slider-block"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="slider-track" style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}>
                    {slides.map((slide) => (
                        <div key={slide.id} className="slider-slide">
                            <img src={slide.image} alt={slide.alt} className="slider-image" />
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    className="slider-button slider-button--prev"
                    aria-label="Предыдущий слайд"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                        <path d="M10 13.2375L3.81916 7.5L10 1.7625L8.09717 0L0 7.5L8.09717 15L10 13.2375Z" fill="#2D7B9E"/>
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="slider-button slider-button--next"
                    aria-label="Следующий слайд"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none">
                        <path d="M0 13.2375L6.18084 7.5L0 1.7625L1.90283 0L10 7.5L1.90283 15L0 13.2375Z" fill="#2D7B9E"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Slider;