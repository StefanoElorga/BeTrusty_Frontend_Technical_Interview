"use client";
import React, { useState } from "react";
import Image from "next/image";
import imgSlide1 from "../assets/Rectangle25.png";
import imgSlide2 from "../assets/Rectangle26.png";
import imgSlide3 from "../assets/Rectangle28.png";
import imgSlide4 from "../assets/Rectangle24.png";
import nextArrow from "../assets/Next-arrow.png";
import prevArrow from "../assets/Prev-arrow.png";
import { StaticImageData } from "next/image";

//CREAMOS un "interface" donde guardamos y utilizaremos nuestras props para los botones del Slider.
interface SlideButtonProps {
  onClick: () => void;
  arrow: StaticImageData;
  name: string;
}

//CREAMOS una Function Component para los botones del Slider, la función será dinamica.
const SlideButton: React.FC<SlideButtonProps> = ({ onClick, arrow, name }) => {
  return (
    <button
      onClick={onClick}
      className="p-3.5 rounded-full border-white border-2"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <Image src={arrow} alt={name} />
    </button>
  );
};

//CREAMOS el componente Slider.
const Slider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const images: StaticImageData[] = [
    imgSlide1,
    imgSlide2,
    imgSlide3,
    imgSlide4,
  ];

  //FUNCION NEXT
  const nextSlide = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  //FUNCION PREV
  const prevSlide = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  return (
    <div className="w-full relative lg:hidden">
      <div className="absolute w-full  flex flex-row justify-between px-2.5 h-full items-center">
        <SlideButton onClick={prevSlide} name="prev" arrow={prevArrow} />
        <SlideButton onClick={nextSlide} name="next" arrow={nextArrow} />
      </div>

      <div className="w-full h-full">
        <Image
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
