import { request } from '../configs/api';

class JobTypeService {
  //đã dùng để lấy danh sách loại công việc
  fetchJobTypeList(){
    return request({
      url: "/loai-cong-viec",
      method: "GET",
    });
  };
  //delete jobtype
  deleteJobTypeApi(id) {
    return request({
      url: `/loai-cong-viec/${id}`,
      method: "DELETE",
  });
  };
  //add new job type
  addNewJobTypeApi(data){
    return request({
      url: "/loai-cong-viec",
      method: "POST",
      data,
    });
  };
  //getDetailJobType
  getJobTypeDetailApi(id) {
    return request({
      url: `/loai-cong-viec/${id}`,
      method: "GET",
    });
  };
  //updateJobType
  updateJobType(id,data) {
    return request({
      url: `/loai-cong-viec/${id}`,
      method: "PUT",
      data,
    });
  };
}
export const jobTypeService = new JobTypeService();
