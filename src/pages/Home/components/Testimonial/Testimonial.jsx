import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './testimonial.scss';
import VideoModal from '../../../../components/VideoModal/VideoModal';

export default function Testimonial() {
  const testimonialSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
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
    <div className="testimonial">
      <div className="mt-4">
        <div className="container">
          <Slider {...testimonialSettings}>
            <div className="testimonial__item col-lg-12 d-flex align-items-center">
              <VideoModal
                imgUrl={'./img/testimonial1.png'}
                videoUrl={
                  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw'
                }
              />
              <div className="testimonial__content">
                <div className="testimonial__author d-flex align-items-center pb-3">
                  <h5>Kay Kim, Co-Founder</h5>
                  <div className="author__logo">
                    <img
                      className="logo-img"
                      src="./img/rooted-logo-x2.321d79d.png"
                      alt="authorlogo1"
                    />
                  </div>
                </div>
                <div className="testimonial__text">
                  <i>
                    "It's extremely exciting that Fiverr has freelancers from
                    all over the world — it broadens the talent pool. One of the
                    best things about Fiverr is that while we're sleeping,
                    someone's working."
                  </i>
                </div>
              </div>
            </div>
            <div className="testimonial__item col-lg-12 d-flex align-items-center">
              <VideoModal
                imgUrl={'./img/testimonial2.png'}
                videoUrl={
                  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl'
                }
              />
              <div className="testimonial__content">
                <div className="testimonial__author d-flex align-items-center pb-3">
                  <h5>Caitlin Tormey, Chief Commercial Officer</h5>
                  <div className="author__logo">
                    <img
                      className="logo-img"
                      src="./img/naadam-logo-x2.0a3b198.png"
                      alt="authorlogo2"
                    />
                  </div>
                </div>
                <div className="testimonial__text">
                  <i>
                    "We've used Fiverr for Shopify web development, graphic
                    design, and backend web development. Working with Fiverr
                    makes my job a little easier every day."
                  </i>
                </div>
              </div>
            </div>
            <div className="testimonial__item col-lg-12 d-flex align-items-center">
              <VideoModal
                imgUrl={'./img/testimonial3.png'}
                videoUrl={
                  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi'
                }
              />
              <div className="testimonial__content">
                <div className="testimonial__author d-flex align-items-center pb-3">
                  <h5>Brighid Gannon (DNP, PMHNP-BC), Co-Founder</h5>
                  <div className="author__logo">
                    <img
                      className="logo-img"
                      src="./img/lavender-logo-x2.89c5e2e.png"
                      alt="authorlogo3"
                    />
                  </div>
                </div>
                <div className="testimonial__text">
                  <i>
                    "We used Fiverr for SEO, our logo, website, copy, animated
                    videos — literally everything. It was like working with a
                    human right next to you versus being across the world."
                  </i>
                </div>
              </div>
            </div>
            <div className="testimonial__item col-lg-12 d-flex align-items-center">
              <VideoModal
                imgUrl={'./img/testimonial4.png'}
                videoUrl={
                  'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun'
                }
              />
              <div className="testimonial__content">
                <div className="testimonial__author d-flex align-items-center pb-3">
                  <h5>Tim and Dan Joo, Co-Founders</h5>
                  <div className="author__logo">
                    <img
                      className="logo-img"
                      src="./img/haerfest-logo-x2.03fa5c5.png"
                      alt="authorlogo4"
                    />
                  </div>
                </div>
                <div className="testimonial__text">
                  <i>
                    "When you want to create a business bigger than yourself,
                    you need a lot of help. That's what Fiverr does."
                  </i>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
