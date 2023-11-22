import { notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function NoAuthGuard(props) {
  const navigate = useNavigate();

  const userState = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (userState.userInfo) {
      notification.warning({
        message: 'Already logged in!',
        duration: 2,
      });
      navigate('/');
    }
  }, []);

  return <>{props.children}</>;
}
