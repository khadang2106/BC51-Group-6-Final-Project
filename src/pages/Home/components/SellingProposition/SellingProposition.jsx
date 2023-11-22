import React from 'react';
import VideoModal from '../../../../components/VideoModal/VideoModal';

import './sellingProposition.scss';

export default function SellingProposition() {
  return (
    <div className="selling-proposition">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="selling-proposition__content col-12 col-md-12 col-lg-5 col-xl-5">
            <h2>A whole world of freelance talent at your fingertips</h2>
            <ul>
              <div>
                <li>
                  <h6>
                    <i className="fa-regular fa-circle-check" />
                    <span>The best for every budget</span>
                  </h6>
                  <p>
                    Find high-quality services at every price point. No hourly
                    rates, just project-based pricing.
                  </p>
                </li>
                <li>
                  <h6>
                    <i className="fa-regular fa-circle-check" />
                    <span>Quality work done quickly</span>
                  </h6>
                  <p>
                    Find the right freelancer to begin working on your project
                    within minutes.
                  </p>
                </li>
                <li>
                  <h6>
                    <i className="fa-regular fa-circle-check" />
                    <span>Protected payments, every time</span>
                  </h6>
                  <p>
                    Always know what you'll pay upfront. Your payment isn't
                    released until you approve the work.
                  </p>
                </li>
                <li>
                  <h6>
                    <i className="fa-regular fa-circle-check" />
                    <span>24/7 support</span>
                  </h6>
                  <p>
                    Questions? Our round-the-clock support team is available to
                    help anytime, anywhere.
                  </p>
                </li>
              </div>
            </ul>
          </div>
          <div className="selling-proposition__video col-12 col-md-12 col-lg-7 col-xl-7">
            <VideoModal
              imgUrl={'./img/selling.png'}
              videoUrl={
                'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
