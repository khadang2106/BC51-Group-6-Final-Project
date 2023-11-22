import { request } from '../configs/api';

class UserService {
  fetchUserByIdApi(id) {
    return request({
      url: `/users/${id}`,
      method: 'GET',
    });
  }

  updateUserApi(id, data) {
    return request({
      url: `/users/${id}`,
      method: 'PUT',
      data,
    });
  }

  uploadAvatarApi(data) {
    return request({
      url: '/users/upload-avatar',
      method: 'POST',
      data,
    });
  }

  signInApi(data) {
    return request({
      url: '/auth/signin',
      method: 'POST',
      data,
    });
  }

  signUpApi(data) {
    return request({
      url: '/auth/signup',
      method: 'POST',
      data,
    });
  }
}

export const userService = new UserService();
