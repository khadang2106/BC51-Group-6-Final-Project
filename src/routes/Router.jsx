import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
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
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import UserManagement from '../pages/UserManagement/UserManagement';
import JobManagement from '../pages/JobManagement/JobManagement';
import JobTypeManagement from '../pages/JobTypeManagement/JobTypeManagement';
import ServiceManagement from '../pages/ServiceManagement/ServiceManagement';
import AdminGuard from '../guards/AdminGuard';

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
      path: '/admin',
      element: (
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      ),
      children: [
        {
          path: '/admin',
          element: <Navigate to="/admin/user-management" />,
        },
        {
          path: '/admin/user-management',
          element: <UserManagement />,
        },
        {
          path: '/admin/job-management',
          element: <JobManagement />,
        },
        {
          path: '/admin/job-type-management',
          element: <JobTypeManagement />,
        },
        {
          path: '/admin/service-management',
          element: <ServiceManagement />,
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
