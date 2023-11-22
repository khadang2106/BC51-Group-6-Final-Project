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

  //đã dùng để lấy danh sách user
  fetchUserList() {
    return request({
      url: '/users',
      method: 'GET',
    });
  }
  //đã dùng để xóa user
  deleteUserApi(id) {
    return request({
      url: `/users?id=${id}`,
      method: 'DELETE',
    });
  }
  //add new admin
  addNewAdminApi(data) {
    return request({
      url: '/users',
      method: 'POST',
      data,
    });
  }
  //getDetailUser
  getUserDetailApi(id) {
    return request({
      url: `users/${id}`,
      method: 'GET',
    });
  }
  //search tên người dùng
  searchUserApi(TenNguoiDung) {
    return request({
      url: `/users/search/${TenNguoiDung}`,
      method: 'GET',
    });
  }
}

export const userService = new UserService();
