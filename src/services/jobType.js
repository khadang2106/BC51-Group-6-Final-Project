import { request } from '../configs/api';

class JobTypeService {
  //đã dùng để lấy danh sách loại công việc
  fetchJobTypeList(){
    return request({
      url: "/loai-cong-viec",
      method: "GET",
    });
  };

  
  addUserApi(data){
    return request({
      url: "/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data,
    });
  };
  //đã dùng để xóa user
  deleteUserApi(id) {
    return request({
      url: `/users?id=${id}`,
      method: "DELETE",
    });
  };
  updateUserApi(data) {
    return request({
      url: `/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "POST",
      data,
    });
  };
  getUserDetailApi(taiKhoan) {
    return request({
      url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`,
      method: "POST",
    });
  };
  searchUserApi(query) {
    return request({
      url: `/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${query}&maNhom=GP01`,
      method: "GET",
    });
  };
  fetchUserTypes() {
    return request({
      url: "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
      method: "GET",
    });
  }
}
export const jobTypeService = new JobTypeService();
