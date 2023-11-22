import { request } from '../configs/api';

class UserService {
  //đã dùng
  loginApi(data) {
    return request({
      url: `/auth/signin`,
      method: 'POST',
      data,
    });
  }
  //đã dùng để lấy danh sách user
  fetchUserList(){
    return request({
      url: "/users",
      method: "GET",
    });
  };
  //đã dùng để xóa user
  deleteUserApi(id) {
    return request({
      url: `/users?id=${id}`,
      method: "DELETE",
    });
  };
  //add new admin
  addNewAdminApi (data){
    return request({
      url: "/users",
      method: "POST",
      data,
    });
  }
  //getDetailUser
  getUserDetailApi(id) {
    return request({
      url: `users/${id}`,
      method: "GET",
    });
  };
  //updateUser
  updateUserApi(id,data) {
    return request({
      url: `/users/${id}`,
      method: "PUT",
      data,
    });
  };
  //search tên người dùng
  searchUserApi(TenNguoiDung) {
    return request({
      url: `/users/search/${TenNguoiDung}`,
      method: "GET",
    });
  };
}
export const userService = new UserService();
