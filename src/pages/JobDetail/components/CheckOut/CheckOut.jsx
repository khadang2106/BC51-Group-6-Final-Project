import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { hireJob } from '../../../../services/hireJob';
import Swal from 'sweetalert2';
import './checkOut.scss';

export default function CheckOut(props) {
  const { congViec } = props.jobDetail;
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleHireJob = async () => {
    if (userState?.userInfo) {
      const body = {
        maCongViec: congViec?.id,
        maNguoiThue: userState?.userInfo.user.id,
        ngayThue: dayjs().format('DD/MM/YYYY'),
        hoanThanh: true,
      };

      Swal.fire({
        title: 'You want to hire this job?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, checkout for me!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await hireJob.hireJobApi(body);

          Swal.fire({
            title: 'Successfully hired!',
            text: 'Check your job in your profile?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want to check it!',
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Got it!',
                icon: 'success',
              });

              navigate('/profile');
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: 'You need to login to hire this job!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sign In',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user/login');
        }
      });
    }
  };

  const handleOutOfStock = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'This package is out of stock!',
    });
  };

  const tabItems = [
    {
      key: '1',
      label: 'Basic',
      children: (
        <div className="box-body">
          <div className="box-content">
            <div className="price d-flex align-items-center justify-content-between">
              <span>Basic</span>
              <span>${congViec?.giaTien}</span>
            </div>
            <p className="short-desc">{congViec?.moTaNgan}</p>
            <div className="additional-info d-flex justify-content-around mb-3">
              <div className="delivery">
                <i className="fa-regular fa-clock" />
                <span>14 Days Delivery</span>
              </div>
              <div className="revision">
                <i className="fa-solid fa-rotate" />
                <span>Unlimited Revisions</span>
              </div>
            </div>
            <ul className="feature mb-3">
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
            </ul>
            <div className="action">
              <button className="checkout-btn" onClick={handleHireJob}>
                Continue (${congViec?.giaTien})
              </button>
              <p>Compare Packages</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Standard',
      children: (
        <div className="box-body">
          <div className="box-content">
            <div className="price d-flex align-items-center justify-content-between">
              <span>Standard</span>
              <span>$50</span>
            </div>
            <p className="short-desc">{congViec?.moTaNgan}</p>
            <div className="additional-info d-flex justify-content-around mb-3">
              <div className="delivery">
                <i className="fa-regular fa-clock" />
                <span>14 Days Delivery</span>
              </div>
              <div className="revision">
                <i className="fa-solid fa-rotate" />
                <span>Unlimited Revisions</span>
              </div>
            </div>
            <ul className="feature mb-3">
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
            </ul>
            <div className="action">
              <button className="checkout-btn" onClick={handleOutOfStock}>
                Continue ($50)
              </button>
              <p>Compare Packages</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Premium',
      children: (
        <div className="box-body">
          <div className="box-content">
            <div className="price d-flex align-items-center justify-content-between">
              <span>Premium</span>
              <span>$250</span>
            </div>
            <p className="short-desc">{congViec?.moTaNgan}</p>
            <div className="additional-info d-flex justify-content-around mb-3">
              <div className="delivery">
                <i className="fa-regular fa-clock" />
                <span>14 Days Delivery</span>
              </div>
              <div className="revision">
                <i className="fa-solid fa-rotate" />
                <span>Unlimited Revisions</span>
              </div>
            </div>
            <ul className="feature mb-3">
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
              <li>
                <i className="fa-solid fa-check" />
                <span>Good features</span>
              </li>
            </ul>
            <div className="action">
              <button className="checkout-btn" onClick={handleOutOfStock}>
                Continue ($250)
              </button>
              <p>Compare Packages</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="check-out-box">
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
}
