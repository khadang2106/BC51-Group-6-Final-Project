import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';

import './login.scss';
import { useDispatch } from 'react-redux';
import { userService } from '../../services/user';
import { setUserInfoAction } from '../../store/actions/userAction';
import { notification } from 'antd';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('(*) Email cannot be blank!'),
    password: Yup.string().required('(*) Password cannot be blank!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    try {
      const result = await userService.signInApi(values);

      dispatch(setUserInfoAction(result.data.content));
      localStorage.setItem('USER_INFO', JSON.stringify(result.data.content));

      notification.success({
        message: 'Login successfully!',
        placement: 'topLeft',
        duration: 2,
      });

      navigate('/');
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
    <div className="login__content">
      <div className="login__left">
        <div>
          <img
            className="img-fluid"
            src="../img/signin.6f1c72291c1ec0817ded.jpg"
            alt="login"
          />
        </div>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        <div className="login__right text-center">
          <h2>Sign In To Fiverr</h2>
          <Form className="login-form">
            <div className="fiverr-form-control">
              <i className="fa-solid fa-user" />
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
            <div className="action-zone mt-4">
              <button className="btn action-btn" type="submit">
                Login
              </button>
              <span>
                Don't have an account? {''}
                <NavLink to={'/user/register'}>Join here</NavLink>
              </span>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
}
