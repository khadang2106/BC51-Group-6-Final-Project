import React from 'react';
import { useRoutes } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Home from '../pages/Home/Home';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import UserLayout from '../layouts/UserLayout/UserLayout';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import JobCategories from '../pages/JobCategories/JobCategories';
import CategoriesDetail from '../pages/CategoriesDetail/CategoriesDetail';
import JobDetail from '../pages/JobDetail/JobDetail';
import NoAuthGuard from '../guards/NoAuthGuard';
import Profile from '../pages/Profile/Profile';
import AuthGuard from '../guards/AuthGuard';
import Result from '../pages/Result/Result';

export default function Router() {
  const routing = useRoutes([
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/result/:keyword',
          element: <Result />,
        },
        {
          path: '/job-categories/:id',
          element: <JobCategories />,
        },
        {
          path: '/categories-detail/:id',
          element: <CategoriesDetail />,
        },
        {
          path: '/job-detail/:id',
          element: <JobDetail />,
        },
        {
          path: '/profile/',
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: '/user',
      element: (
        <NoAuthGuard>
          <UserLayout />
        </NoAuthGuard>
      ),
      children: [
        {
          path: '/user/register',
          element: <Register />,
        },
        {
          path: '/user/login',
          element: <Login />,
        },
      ],
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return routing;
}
