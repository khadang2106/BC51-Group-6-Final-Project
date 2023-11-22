import React from 'react';

import './partners.scss';

export default function Partners() {
  return (
    <div className="partners">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <span>Trusted by:</span>
          <ul className="partners__logo d-flex align-items-center">
            <li className="partners__logo__item">
              <img className="img-fluid" src="./img/fb.png" alt="fb" />
            </li>
            <li className="partners__logo__item">
              <img className="img-fluid" src="./img/google.png" alt="google" />
            </li>
            <li className="partners__logo__item">
              <img
                className="img-fluid"
                src="./img/netflix.png"
                alt="netflix"
              />
            </li>
            <li className="partners__logo__item">
              <img className="img-fluid" src="./img/pg.png" alt="pg" />
            </li>
            <li className="partners__logo__item">
              <img className="img-fluid" src="./img/paypal.png" alt="paypal" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
