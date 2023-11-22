import React from 'react';

import './style.scss';
import Carousel from './components/Carousel/Carousel';
import Services from './components/Services/Services';
import Partners from './components/Partners/Partners';
import SellingProposition from './components/SellingProposition/SellingProposition';
import Testimonial from './components/Testimonial/Testimonial';
import Marketplace from './components/Marketplace/Marketplace';

export default function Home() {
  return (
    <>
      <Carousel />

      <Partners />

      <Services />

      <SellingProposition />

      <Testimonial />

      <Marketplace />
    </>
  );
}
