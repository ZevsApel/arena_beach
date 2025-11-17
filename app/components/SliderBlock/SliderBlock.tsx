import BlockTitle from "../BlockTitle/BlockTitle";
import Slider from "../Slider/Slider";
import './SliderBlock.scss';

const SliderBlock = () => {

    const sliderData = [
    {
      id: 1,
      image: '/upload/slider/1.jpg',
      alt: ''
    },
    {
      id: 2,
      image: '/upload/slider/2.jpg',
      alt: ''
    },
    {
      id: 3,
      image: '/upload/slider/3.jpg',
      alt: ''
    },
    {
      id: 4,
      image: '/upload/slider/4.jpg',
      alt: ''
    },
    {
      id: 5,
      image: '/upload/slider/1.jpg',
      alt: ''
    },
    {
      id: 6,
      image: '/upload/slider/2.jpg',
      alt: ''
    },
    {
      id: 7,
      image: '/upload/slider/3.jpg',
      alt: ''
    },
    {
      id: 8,
      image: '/upload/slider/4.jpg',
      alt: ''
    },
    {
      id: 9,
      image: '/upload/slider/1.jpg',
      alt: ''
    },
    {
      id: 10,
      image: '/upload/slider/2.jpg',
      alt: ''
    }
  ];

    return(
        <div className="slider-block__container">
            <BlockTitle>Мы заботимся о каждой детали</BlockTitle>
            <Slider slides={sliderData} />
        </div>
    );
}

export default SliderBlock;