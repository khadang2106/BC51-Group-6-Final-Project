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
}
export const userService = new UserService();
