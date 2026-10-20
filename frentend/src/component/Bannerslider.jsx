import React, { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "../design/banner.slider.css"
import { banner_get } from "../axios/product.axios";

function Bannerslider() {

  const [banner, setBanner] = useState([]);
  const [current, setCurrent] = useState(0);


  // =================================
  // GET BANNERS
  // =================================

  useEffect(() => {

    const getBanners = async () => {

      try {

        const response = await banner_get();

        console.log("Banners:", response);

        // response MUST be array
        setBanner(response);

      } catch (error) {

        console.log("Banner error:", error);

      }

    };

    getBanners();

  }, []);


  // =================================
  // NEXT
  // =================================

  const nextSlide = () => {

    setCurrent((prev) => {

      if (banner.length === 0) {
        return 0;
      }

      return prev === banner.length - 1
        ? 0
        : prev + 1;

    });

  };


  // =================================
  // PREVIOUS
  // =================================

  const prevSlide = () => {

    setCurrent((prev) => {

      if (banner.length === 0) {
        return 0;
      }

      return prev === 0
        ? banner.length - 1
        : prev - 1;

    });

  };


  // =================================
  // AUTO SLIDER
  // =================================

  useEffect(() => {

    if (banner.length <= 1) {
      return;
    }

    const timer = setInterval(() => {

      setCurrent((prev) =>
        prev === banner.length - 1
          ? 0
          : prev + 1
      );

    }, 4000);

    return () => clearInterval(timer);

  }, [banner.length]);


  // =================================
  // LOADING
  // =================================

  if (banner.length === 0) {

    return (
      <div className="banner-loading">
        Loading banners...
      </div>
    );

  }


  return (
    <section className="banner-section">

      <div className="banner-slider">


        {/* =================================
            IMAGES
        ================================= */}

        <div className="banner-image-container">

          {banner.map((item, index) => (

            <img
              key={item.id}
              src={`data:${item.contentType};base64,${item.image}`}
              alt={`Banner ${index + 1}`}
              className={`banner-image ${
                index === current ? "active" : ""
              }`}
            />

          ))}

        </div>


        {/* =================================
            LEFT
        ================================= */}

        <button
          type="button"
          className="banner-arrow banner-arrow-left"
          onClick={prevSlide}
          aria-label="Previous banner"
        >
          <FiChevronLeft />
        </button>


        {/* =================================
            RIGHT
        ================================= */}

        <button
          type="button"
          className="banner-arrow banner-arrow-right"
          onClick={nextSlide}
          aria-label="Next banner"
        >
          <FiChevronRight />
        </button>


        {/* =================================
            DOTS
        ================================= */}

        <div className="banner-dots">

          {banner.map((_, index) => (

            <button
              type="button"
              key={index}
              className={`banner-dot ${
                index === current ? "active" : ""
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to banner ${index + 1}`}
            />

          ))}

        </div>

      </div>

    </section>
  );
}
export default  Bannerslider;