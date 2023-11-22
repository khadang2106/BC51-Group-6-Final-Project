import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/job';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfoAction } from '../../store/actions/userAction';
import './header.scss';
import { LoadingContext } from '../../contexts/Loading/Loading';
import { Button, Drawer } from 'antd';

export default function Header() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userReducer);
  const [_, setLoadingState] = useContext(LoadingContext);

  const renderButton = () => {
    if (!userState.userInfo) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/user/login'}>
              Sign in
            </NavLink>
          </li>
          <li className="nav-item join">
            <NavLink className="join-btn nav-link" to={'/user/register'}>
              Join
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item dropdown show-user">
          <div
            className="nav-link user-profile"
            role="button"
            data-toggle="dropdown"
          >
            <div className="user-info">
              <img
                className="user-avatar"
                src={
                  userState?.userInfo?.user?.avatar
                    ? userState?.userInfo?.user.avatar
                    : 'https://static.thenounproject.com/png/363639-200.png'
                }
                alt=""
              />
            </div>
          </div>
          <div className="dropdown-menu">
            <span className="dropdown-item-text">
              Welcome {userState.userInfo.user.name}
            </span>
            <div className="dropdown-divider" />
            <button
              onClick={() => navigate(`/profile`)}
              className="dropdown-item profile"
            >
              <i className="fa-solid fa-user" />
              Profile
            </button>
            <button onClick={handleLogout} className="dropdown-item logout">
              <i className="fa-solid fa-arrow-right-from-bracket" />
              Log Out
            </button>
          </div>
        </li>
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('USER_INFO');
    dispatch(setUserInfoAction(null));
    navigate('/');
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [jobList, setJobList] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const updatePosition = () => {
      if (location.pathname === '/') {
        setScrollPosition(window.scrollY);
      } else if (location.pathname !== '/') {
        setScrollPosition(0);
      }
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [location.pathname]);

  const getClassName = (firstClass, secondClass) => {
    if (scrollPosition > 0 || location.pathname !== '/') {
      return firstClass;
    }
    return secondClass;
  };

  const getStyle = () => {
    if (location.pathname !== '/') {
      return 'revert';
    }
    return 'fixed';
  };

  useEffect(() => {
    fetchJobMenu();
  }, []);

  const fetchJobMenu = async () => {
    setLoadingState({ isLoading: true });

    const result = await jobService.fetchJobMenuApi();
    setJobList(result.data.content);

    setLoadingState({ isLoading: false });
  };

  const renderJobMenu = () => {
    return jobList.map((job) => {
      const { tenLoaiCongViec, id, dsNhomChiTietLoai } = job;

      return (
        <li className="categories__item" key={id}>
          <NavLink
            className="categories__item__title"
            to={`/job-categories/${id}`}
          >
            {tenLoaiCongViec}
          </NavLink>
          <ul className="categories__item__detail">
            {dsNhomChiTietLoai.map((group) => {
              const { tenNhom, id, dsChiTietLoai } = group;

              return (
                <ul className="container-fluid" key={id}>
                  <li className="job-title">{tenNhom}</li>
                  {dsChiTietLoai.map((jobDetail) => {
                    const { id, tenChiTiet } = jobDetail;

                    return (
                      <li className="job-detail" key={id}>
                        <NavLink to={`/categories-detail/${id}`}>
                          {tenChiTiet}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </ul>
        </li>
      );
    });
  };

  const handleGetKeyword = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/result/${keyword}`);
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <header
        className={getClassName('header', 'header transparent-header')}
        style={{ position: getStyle() }}
      >
        <div className="header__wrapper">
          <div className="row header__row">
            <div className="header__left">
              <div className="header__collapse">
                <Button onClick={showDrawer}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                  </svg>
                </Button>
                <Drawer
                  title={
                    <NavLink className="drawer-login-btn" to={'/user/login'}>
                      Sign In
                    </NavLink>
                  }
                  placement="left"
                  onClose={onCloseDrawer}
                  open={openDrawer}
                >
                  <div className="nav_item_ul d-flex flex-column">
                    <p className="active">Fiverr Pro</p>
                    <p>Explore</p>
                    <p>Messages</p>
                    <p>List</p>
                    <p>Orders</p>
                  </div>
                </Drawer>
              </div>
              <NavLink to={'/'} className="fiverr-logo mr-4">
                <svg
                  width={89}
                  height={27}
                  viewBox="0 0 89 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#404145">
                    <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" />
                  </g>
                  <g fill="#1dbf73">
                    <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" />
                  </g>
                </svg>
              </NavLink>
              <div className="header__search">
                <form action="" onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Find Services"
                      name="keyword"
                      onChange={handleGetKeyword}
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="header__right">
              <nav className="navbar navbar-expand-sm">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Fiverr Business
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Explore
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa-solid fa-globe mr-1" />
                      English
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      US$ USD
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Become a Seller
                    </a>
                  </li>
                  {renderButton()}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section
        className={getClassName(
          'categories-menu',
          'categories-menu transparent-categories'
        )}
        style={{ position: getStyle() }}
      >
        <div className="categories-menu__wrapper">
          <ul className="categories">{renderJobMenu()}</ul>
        </div>
      </section>
    </>
  );
}
