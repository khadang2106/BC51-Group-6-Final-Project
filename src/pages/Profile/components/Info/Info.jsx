import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userService } from '../../../../services/user';
import { Modal, notification } from 'antd';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { reloadUserAction } from '../../../../store/actions/userAction';
import './info.scss';
import { LoadingContext } from '../../../../contexts/Loading/Loading';

export default function Info() {
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [_, setLoadingState] = useContext(LoadingContext);

  const [userInfo, setUserInfo] = useState({
    name: '',
    birthday: '',
    email: '',
    phone: '',
    gender: true,
    certification: [],
    skill: [],
  });
  const [ava, setAva] = useState();

  useEffect(() => {
    fetchUserById();
  }, [userState]);

  const fetchUserById = async () => {
    setLoadingState({ isLoading: true });

    const result = await userService.fetchUserByIdApi(
      userState.userInfo.user.id
    );
    setUserInfo(result.data.content);
    setAva(result.data.content.avatar);

    setLoadingState({ isLoading: false });
  };

  const uploadAvatar = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('formFile', file);

      try {
        await userService.uploadAvatarApi(formData).then((result) => {
          dispatch(reloadUserAction(result.data.content));
        });

        notification.success({
          message: 'Upload successfully!',
          duration: 2,
        });
      } catch (error) {
        notification.error({
          message: error.response.data.content,
          duration: 2,
        });
      }
    }
  };

  const { avatar, birthday, certification, email, name, phone, skill } =
    userInfo;

  const renderBadge = (data) => {
    return data?.map((element, index) => {
      return (
        <span className="badge badge-success badge-pill" key={index}>
          {element}
        </span>
      );
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('(*) Please enter valid'),
    phone: Yup.string().required('(*) please enter valid!!'),
    birthday: Yup.string().required('(*) Please enter valid'),
  });

  const handleUpdate = async (values) => {
    try {
      await userService
        .updateUserApi(userInfo?.id, values)
        .then((result) => {
          dispatch(reloadUserAction(result.data.content));
        })
        .catch((error) => console.log(error));

      notification.success({
        message: 'Update Info Successfully!',
        placement: 'topRight',
        duration: 2,
      });

      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="info">
        <div className="info__top">
          <div className="info__card">
            <div className="info__profile">
              <div className="user__img">
                <label className="img__label">
                  <div className="label__camera">
                    <i className="fa-solid fa-camera" />
                  </div>
                  <input type="file" accept="image/*" onChange={uploadAvatar} />
                  <div className="d-flex">
                    {avatar ? (
                      <img className="img-fluid" src={avatar} alt="" />
                    ) : (
                      <p
                        className="text my-0 text-center"
                        style={{ fontSize: 16, color: '#8c8c8c' }}
                      >
                        {userInfo.name}
                      </p>
                    )}
                  </div>
                </label>
              </div>
              <div className="user__label">
                <p>{email}</p>
              </div>
            </div>
            <div className="desc">
              <div className="desc__item">
                <div className="left">
                  <i className="fa-solid fa-location-dot" />
                  <span>From</span>
                </div>
                <div className="right">
                  <span>Vietnam</span>
                </div>
              </div>
              <div className="desc__item">
                <div className="left">
                  <i className="fa-solid fa-user" />
                  <span>Member since</span>
                </div>
                <div className="right">
                  <span>Oct 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="info__bottom">
          <div className="info__card">
            <div className="item">
              <div className="item__title description">
                <h3>Description</h3>
                <button
                  className="btn edit-btn"
                  onClick={() => setVisible(true)}
                >
                  <i className="fa-solid fa-pen-to-square" />
                </button>
              </div>
              <div className="description-detail">
                <h6>Name:</h6>
                <p>{name}</p>
              </div>
              <div className="description-detail">
                <h6>Phone:</h6>
                <p>{phone}</p>
              </div>
              <div className="description-detail">
                <h6>Birthday:</h6>
                <p>{birthday}</p>
              </div>
            </div>
            <div className="item">
              <div className="item__title">
                <h3>Languages</h3>
              </div>
              <p>
                English - <span>Basic</span>
              </p>
              <p>
                Vietnamese (Tiếng Việt) - <span>Native/Bilingual</span>
              </p>
            </div>
            <div className="item">
              <div className="item__title">
                <h3>Skills</h3>
              </div>
              <div className="badge-list d-flex flex-wrap">
                {renderBadge(skill)}
              </div>
            </div>
            <div className="item">
              <div className="item__title">
                <h3>Education</h3>
              </div>
              <p>CYBERSOFT</p>
            </div>
            <div className="item">
              <div className="item__title">
                <h3>Certification</h3>
              </div>
              <div className="badge-list d-flex flex-wrap">
                {renderBadge(certification)}
              </div>
            </div>
            <div className="item" style={{ border: 'none' }}>
              <div className="item__title">
                <h3>Linked Accounts</h3>
              </div>
              <ul className="mt-2">
                <li>
                  <i className="fa-brands fa-facebook" />
                  <NavLink target="_blank" to={'https://www.facebook.com/'}>
                    Facebook
                  </NavLink>
                </li>
                <li>
                  <i className="fa-brands fa-google" />
                  <NavLink target="_blank" to={'https://www.google.com.vn/'}>
                    Google
                  </NavLink>
                </li>
                <li>
                  <i className="fa-brands fa-github" />
                  <NavLink target="_blank" to={'https://github.com/'}>
                    Github
                  </NavLink>
                </li>
                <li>
                  <i className="fa-brands fa-twitter" />
                  <NavLink to={'https://twitter.com/?lang=vi'} target="_blank">
                    Twitter
                  </NavLink>
                </li>
                <li>
                  <i className="fa-brands fa-dribbble" />
                  <NavLink target="_blank" to={'https://dribbble.com/'}>
                    Dribble
                  </NavLink>
                </li>
                <li>
                  <i className="fa-brands fa-stack-overflow" />
                  <NavLink target="_blank" to={'https://stackoverflow.com/'}>
                    Stack Overflow
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={visible}
        title="Update Information"
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          enableReinitialize
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          <Form className="update-form row">
            <div className="form-group col-6">
              <label className="block mb-1">
                <span className="text-danger">*</span> Email
              </label>
              <Field
                className="form-control"
                name="email"
                type="text"
                disabled
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form-label text-danger"
              />
            </div>
            <div className="form-group col-6">
              <label className="block mb-1">
                <span className="text-danger">*</span> Name
              </label>
              <Field className="form-control" name="name" type="text" />
              <ErrorMessage
                name="name"
                component="div"
                className="form-label text-danger"
              />
            </div>
            <div className="form-group col-6">
              <label className="block mb-1">
                <span className="text-danger">*</span> Phone
              </label>
              <Field className="form-control" name="phone" type="text" />
              <ErrorMessage
                name="phone"
                component="div"
                className="form-label text-danger"
              />
            </div>
            <div className="form-group col-6">
              <label className="block mb-1">
                <span className="text-danger">*</span> Birthday
              </label>
              <Field className="form-control" name="birthday" type="text" />
              <ErrorMessage
                name="birthday"
                component="div"
                className="form-label text-danger"
              />
            </div>

            <div className="form-group checkbox-form col-6">
              <label className="block mb-1">
                <span className="text-danger">*</span> Skills
              </label>
              <div
                role="group"
                aria-labelledby="checkbox-group"
                className="checkbox-group"
              >
                <label>
                  <Field type="checkbox" name="skill" value="FrontEnd" />
                  FrontEnd
                </label>
                <label>
                  <Field type="checkbox" name="skill" value="BackEnd" />
                  BackEnd
                </label>
                <label>
                  <Field type="checkbox" name="skill" value="Fullstack" />
                  Fullstack
                </label>
              </div>
              <ErrorMessage
                name="skill"
                component="div"
                className="form-label text-danger"
              />
            </div>
            <div className="form-group checkbox-form col-6">
              <label className="block mb-1">
                <span className="text-danger">*</span> Certification
              </label>
              <div
                role="group"
                aria-labelledby="checkbox-group"
                className="checkbox-group"
              >
                <label>
                  <Field
                    type="checkbox"
                    name="certification"
                    value="Cybersoft"
                  />
                  Cybersoft
                </label>
                <label>
                  <Field type="checkbox" name="certification" value="FPT" />
                  FPT
                </label>
                <label>
                  <Field type="checkbox" name="certification" value="MindX" />
                  MindX
                </label>
              </div>
              <ErrorMessage
                name="certification"
                component="div"
                className="form-label text-danger"
              />
            </div>
            <div className="form-group radio-form col-6">
              <label className="block m-1">
                <span className="text-danger">*</span> Gender
              </label>
              <Field className="form-control" name="gender" as="select">
                <option value={true}>Male</option>
                <option value={false}>Female</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="form-label text-danger"
              />
            </div>
            <div className="wrap-button">
              <button
                className="button btn-cancel"
                type="button"
                onClick={() => setVisible(false)}
              >
                Cancel
              </button>
              <button className="button btn-update" type="submit">
                Update
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}
