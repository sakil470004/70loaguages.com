import { useState } from "react";
import img1 from "../../assets/1.webp";
import img3 from "../../assets/3.webp";
import img5 from "../../assets/5.webp";
import img6 from "../../assets/6.webp";

import { useEffect } from "react";
function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img5, img1, img6, img3 ];

  const handleNext = (index) => {
    const nextIndex = (index + 1) % 4;
    setCurrentIndex(nextIndex);
  };
  const handlePrev = (index) => {
    const prevIndex = (index - 1 + 4) % 4;
    setCurrentIndex(prevIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(currentIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <div className=" w-full overflow-hidden my-4">
      {images.map((img, index) => (
        <div
          className={`group relative w-full  justify-center items-center md:h-[450px]  ${
            index === currentIndex ? "flex" : "hidden"
          }`}
          key={index}
        >
          <img
            src={img}
            className="w-full object-cover max-h-full m-auto rounded-lg group-hover:transform group-hover:scale-105 transition-all  duration-700"
            alt="Easy Bazar Image"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              onClick={() => handleNext(index)}
              className="btn btn-circle"
            >
              ❮
            </button>
            <button
              onClick={() => handlePrev(index)}
              className="btn btn-circle"
            >
              ❯
            </button>
          </div>
        </div>
      ))}
      {/*
         <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div> */}
    </div>
  );
}

export default Slider;
