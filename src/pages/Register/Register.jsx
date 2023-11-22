import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { userService } from '../../services/user';
import moment from 'moment';
import './register.scss';
import { notification } from 'antd';

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('(*) Name cannot be blank'),
    email: Yup.string()
      .email('(*) Invalid Email')
      .required('(*) Email cannot be blank'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, '(*) Invalid Phone')
      .required('(*) Phone cannot be blank'),
    password: Yup.string()
      .min(6, '(*) Password need atleast 6 letters')
      .required('(*) Password cannot be blank'),
    birthday: Yup.date().required('(*) Birthday cannot be blank'),
    gender: Yup.string().required('(*) Gender cannot be blank'),
  });

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    birthday: '',
    gender: '',
  };

  const handleRegisterSubmit = async (values, { resetForm }) => {
    try {
      await userService.signUpApi(values);

      notification.success({
        message: 'Sign up successfully!',
        placement: 'topLeft',
        duration: 2,
      });

      navigate('/user/login');
    } catch (error) {
      notification.error({
        message: error.response.data.content,
        placement: 'top',
        duration: 2,
      });
    }

    resetForm();
  };

  return (
    <div className="register__content">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegisterSubmit}
      >
        <div className="left text-center">
          <h2>Sign Up</h2>
          <Form className="register-form">
            <div className="fiverr-form-control">
              <i className="fa-solid fa-user" />
              <Field
                className="form-control"
                name="name"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="error-login w-100 mt-1">
              <ErrorMessage
                name="name"
                component="label"
                className="error-message text-danger"
              />
            </div>
            <div className="fiverr-form-control mt-3">
              <i className="fa-solid fa-envelope" />
              <Field
                className="form-control"
                name="email"
                type="text"
                placeholder="Your Email"
              />
            </div>
            <div className="error-login w-100 mt-1">
              <ErrorMessage
                name="email"
                component="label"
                className="error-message text-danger"
              />
            </div>
            <div className="fiverr-form-control mt-3">
              <i className="fa-solid fa-lock" />
              <Field
                className="form-control"
                name="password"
                type="password"
                placeholder="Your Password"
              />
            </div>
            <div className="error-login w-100 mt-1">
              <ErrorMessage
                name="password"
                component="label"
                className="error-message text-danger"
              />
            </div>
            <div className="fiverr-form-control mt-3">
              <i className="fa-solid fa-phone" />
              <Field
                className="form-control"
                name="phone"
                type="text"
                placeholder="Your Phone"
              />
            </div>
            <div className="error-login w-100 mt-1">
              <ErrorMessage
                name="phone"
                component="label"
                className="error-message text-danger"
              />
            </div>
            <div className="fiverr-form-control mt-3">
              <i className="fa-solid fa-cake-candles" />
              <Field
                className="form-control"
                name="birthday"
                type="date"
                placeholder="Your Birthday"
              />
            </div>
            <div className="error-login w-100 mt-1">
              <ErrorMessage
                name="birthday"
                component="label"
                className="error-message text-danger"
              />
            </div>
            <div
              className="fiverr-form-control mt-3"
              role="group"
              aria-labelledby="gender-label"
            >
              <label id="gender-label">
                <i className="fa-solid fa-mars-and-venus" />
              </label>
              <div>
                <label>
                  <Field type="radio" name="gender" value="true" />
                  Male
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="gender" value="false" />
                  Female
                </label>
              </div>
            </div>
            <div className="error-login w-100 mt-1">
              <ErrorMessage
                name="gender"
                component="label"
                className="error-message text-danger"
              />
            </div>
            <div className="action-zone mt-4">
              <button className="btn action-btn" type="submit">
                Sign Up
              </button>
              <span>
                Already have an account? {''}
                <NavLink to={'/user/login'}>Click here</NavLink>
              </span>
            </div>
          </Form>
        </div>
      </Formik>
      <div className="right">
        <div>
          <img
            className="img-fluid"
            src="../img/signup.bd994738c4eb8deb2801.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
