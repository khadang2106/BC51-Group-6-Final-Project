import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import Home from '../pages/Home/Home';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import UserManagement from '../pages/UserManagement/UserManagement';
import JobManagement from '../pages/JobManagement/JobManagement';
import JobTypeManagement from '../pages/JobTypeManagement/JobTypeManagement';
import ServiceManagement from '../pages/ServiceManagement/ServiceManagement';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import Login from '../pages/Login/Login';
import AdminGuard from '../guards/AdminGuard';
import Profile from '../pages/Profile/Profile';

export default function Router() {

    const routing = useRoutes([{
        path: '/',
        element: <HomeLayout />,
        children:[
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/profile',
                element: <Profile />
            }
        ]
    },{
        path: '/admin',
        element: (
            <AdminGuard>
                <AdminLayout />
            </AdminGuard>
        ),
        children: [
            {
                path: "/admin",
                element: <Navigate to="/admin/user-management" />,
            },
            {
                path: "/admin/user-management",
                element: <UserManagement />
            },
            {
                path: "/admin/job-management",
                element: <JobManagement />
            },
            {
                path: "/admin/job-type-management",
                element: <JobTypeManagement />
            },
            {
                path: "/admin/service-management",
                element: <ServiceManagement />
            }
        ]
    },{
        path: '*',
        element: <PageNotFound />
    },

    ]);

  return routing;
}
