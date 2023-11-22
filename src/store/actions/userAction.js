import { RELOAD_USER, SET_USER_INFO } from '../types/userType';

export const setUserInfoAction = (data) => {
  return {
    type: SET_USER_INFO,
    payload: data,
  };
};

export const reloadUserAction = (data) => {
  return {
    type: RELOAD_USER,
    payload: data,
  };
};
