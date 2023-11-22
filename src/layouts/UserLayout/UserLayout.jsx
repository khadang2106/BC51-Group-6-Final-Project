import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

import './userLayout.scss';
import Header from '../../components/Header/Header';

export default function UserLayout() {
  return (
    <>
      <Header />
      <div className="user-auth">
        <div className="container user-auth-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
