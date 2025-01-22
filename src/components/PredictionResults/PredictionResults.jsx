"use client";
import React from "react";
import Slider from "react-slick";
import styles from "./PredictionResults.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PredictionResults = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const logoImages = [
    "/Images/1.jpg",
    "/Images/2.jpg",
    "/Images/3.jpg",
    "/Images/4.jpg",
    "/Images/5.jpg",
    "/Images/6.jpg",
    "/Images/1.jpg",
    "/Images/2.jpg",
    "/Images/3.jpg",
    "/Images/4.jpg",
    "/Images/5.jpg",
    "/Images/6.jpg",
    "/Images/1.jpg",
    "/Images/2.jpg",
    "/Images/3.jpg",
    "/Images/4.jpg",
    "/Images/5.jpg",
    "/Images/6.jpg",
  ];
  return (
    <div className="flex flex-col justify-center items-center px-40 py-16 gap-4">
      <div className="text-content items-center">
        <h2 className="text-[#5777BA] text-[44px] font-bold mb-2 text-center">
          Prediction Results
        </h2>
        <p className="text-[#515f7d] text-lg mb-2">
          Sample prediction results produced by our deepfake detection model
        </p>
      </div>
      <div className="slider w-screen flex items-center justify-center flex-row overflow-x-hidden">
        <div className="flex items-center justify-center w-screen">
          {/* Slider Section */}
          <div className={`${styles.hero} `}>
            <div className={`${styles.sliderContainer} `}>
              <Slider {...settings}>
                {logoImages.map((src, index) => {
                  return (
                    <div className={`${styles.cardCover} `} key={index}>
                      <div className={`${styles.card} `}>
                        <img
                          alt={`Logo ${index + 1}`}
                          src={src}
                          className={`img h-full w-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;
