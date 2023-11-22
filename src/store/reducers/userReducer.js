import { RELOAD_USER, SET_USER_INFO } from '../types/userType';

const DEFAULT_STATE = {
  userInfo: null,
  userList: [],
};

const stringify = localStorage.getItem('USER_INFO');

if (stringify) {
  DEFAULT_STATE.userInfo = JSON.parse(stringify);
}
export const userReducer = (state = DEFAULT_STATE, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_USER_INFO: {
      state.userInfo = action.payload;
      break;
    }
    case RELOAD_USER: {
      state.userInfo.user = action.payload;
      break;
    }
  }
  return { ...state };
};

export const selectUserInfo = (state) => state.userInfo;
