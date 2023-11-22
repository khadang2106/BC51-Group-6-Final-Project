import React from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './services.scss';

export default function Services() {
  const servicesSettings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    speed: 500,
    nextArrow: (
      <button type="button" className="slick-next">
        Next
      </button>
    ),

    prevArrow: (
      <button type="button" className="slick-prev">
        Previous
      </button>
    ),
  };

  return (
    <div className="services">
      <div className="container">
        <h2>Popular professional services</h2>
        <div className="services__slider mt-4">
          <Slider {...servicesSettings}>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs1.png" alt="crs1" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs2.png" alt="crs2" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs3.png" alt="crs3" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs4.png" alt="crs4" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs5.png" alt="crs5" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs6.png" alt="crs6" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs7.png" alt="crs7" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs8.png" alt="crs8" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs9.png" alt="crs9" />
            </div>
            <div className="services__item">
              <img className="img-fluid" src="./img/crs10.png" alt="crs10" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
