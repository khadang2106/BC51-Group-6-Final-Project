import React, { useEffect } from 'react';
import Gigs from './components/Gigs/Gigs';
import Info from './components/Info/Info';
import './profile.scss';

export default function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profile my-3">
      <div className="profile__wrapper">
        <div className="profile__content row">
          <Info />

          <Gigs />
        </div>
      </div>
    </div>
  );
}
