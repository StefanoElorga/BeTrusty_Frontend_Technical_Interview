"use client";
import React, { useState } from "react";
import Image from "next/image";
import imgSlide1 from "../assets/Rectangle25.png";
import imgSlide2 from "../assets/Rectangle26.png";
import imgSlide3 from "../assets/Rectangle28.png";
import nextArrow from "../assets/Next-arrow.png";
import prevArrow from "../assets/Prev-arrow.png";
import { StaticImageData } from "next/image";

const Slider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const images: StaticImageData[] = [imgSlide1, imgSlide2, imgSlide3];

  const nextSlide = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  const prevSlide = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  return (
    <div className="w-full relative">
      <div className="absolute w-full  flex flex-row justify-between px-2.5 h-full items-center">
        <button
          onClick={prevSlide}
          className="p-3.5 rounded-full border-white border-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <Image src={prevArrow} alt="Prev" />
        </button>

        <button
          onClick={nextSlide}
          className="p-3.5 rounded-full border-white border-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <Image src={nextArrow} alt="Next" />
        </button>
      </div>

      <div className="w-full">
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
