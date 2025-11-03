'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import './BigImage.scss';

const BigImage = () => {
  const [actualImage, setActualImage] = useState('desktop');

  useEffect(() => {
    const updateImage = () => {
      if (window.innerWidth < 767) setActualImage('phone');
      else if (window.innerWidth < 1024) setActualImage('tablet');
      else setActualImage('desktop');
    };

    updateImage();
    window.addEventListener('resize', updateImage);
    return () => window.removeEventListener('resize', updateImage);
  }, []);

  return (
    <div className="big-image-block">
      <Image
        className="big-image"
        src={`/upload/bigImage/${actualImage}.jpg`}
        width={1920}
        height={452}
        alt="Изображение отеля"
      />
    </div>
  );
};

export default BigImage;
