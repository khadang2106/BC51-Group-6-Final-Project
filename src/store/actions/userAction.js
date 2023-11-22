import { userService } from '../../services/user';
import {
  RELOAD_USER,
  DELETE_USER,
  SET_USER_INFO,
  UPDATE_USER,
} from '../types/userType';

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
// nhấn nút delete
export const deleteUserAction = (user) => async (dispatch) => {
  try {
    const response = await userService.deleteUserApi(user.id);
    if (response.data.statusCode === 200) {
      dispatch({
        type: DELETE_USER,
        payload: user,
      });
      return { success: true };
    } else {
      console.error('Có lỗi khi xóa user', response.data);
      return { success: false };
    }
  } catch (error) {
    console.error('Có lỗi khi call api', error);
    return { success: false };
  }
};
// update
export const updateUserAction = (userData) => async (dispatch) => {
  try {
    const { id, ...updatedData } = userData;
    console.log(id);
    console.log(updatedData);
    const response = await userService.updateUserApi(id, updatedData);
    if (response.data.statusCode === 200) {
      dispatch({
        type: UPDATE_USER,
        payload: userData,
      });
      alert('Cập nhật người dùng thành công!');
      document.getElementById('close2').click();
    } else {
      console.error('Error updating user:', response.data);
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
