import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './carousel.scss';

export default function Carousel() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const carouselSettings = {
    dots: false,
    arrows: false,
    draggable: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  const handleGetKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/result/${keyword}`);
  };
  const handleSearchPopular = (keyword) => {
    navigate(`/result/${keyword}`);
  };

  return (
    <div className="carousel">
      <Slider {...carouselSettings}>
        <div className="carousel__item">
          <img
            className="d-block w-100 object-fit"
            src="./img/1.png"
            alt="carouselSlider1"
          />
        </div>
        <div className="carousel__item">
          <img
            className="d-block w-100 object-fit"
            src="./img/2.png"
            alt="carouselSlider2"
          />
        </div>
        <div className="carousel__item">
          <img
            className="d-block w-100 object-fit"
            src="./img/3.png"
            alt="carouselSlider3"
          />
        </div>
        <div className="carousel__item">
          <img
            className="d-block w-100 object-fit"
            src="./img/4.png"
            alt="carouselSlider4"
          />
        </div>
        <div className="carousel__item">
          <img
            className="d-block w-100 object-fit"
            src="./img/5.png"
            alt="carouselSlider5"
          />
        </div>
      </Slider>
      <div className="container carousel__content">
        <div className="container">
          <div className="search-box">
            <h1>
              Find the perfect <i>freelance</i> services for your business
            </h1>
            <div className="carousel__search">
              <form action="" onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder={`Try "building mobile app"`}
                    name="keyword"
                    onChange={handleGetKeyword}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-success" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="carousel__popular">
              <p>Popular:</p>
              <button
                className="btn"
                onClick={() => {
                  handleSearchPopular('Website Design');
                }}
              >
                Website Design
              </button>
              <button
                className="btn"
                onClick={() => {
                  handleSearchPopular('WordPress');
                }}
              >
                WordPress
              </button>
              <button
                className="btn"
                onClick={() => {
                  handleSearchPopular('Logo Design');
                }}
              >
                Logo Design
              </button>
              <button
                className="btn"
                onClick={() => {
                  handleSearchPopular('Video Editing');
                }}
              >
                Video Editing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
