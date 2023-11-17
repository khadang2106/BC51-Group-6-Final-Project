import { request } from '../configs/api';

class JobTypeService {
  //đã dùng để lấy danh sách loại công việc
  fetchJobTypeList(){
    return request({
      url: "/loai-cong-viec",
      method: "GET",
    });
  };
}
export const jobTypeService = new JobTypeService();
