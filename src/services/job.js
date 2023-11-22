import { request } from '../configs/api';

class JobService {
  //đã dùng để lấy danh sách job
  fetchJobList(){
    return request({
      url: "/cong-viec",
      method: "GET",
    });
  };
  //delete job
  deleteJobApi(id) {
    return request({
      url: `/cong-viec/${id}`,
      method: "DELETE",
  });
  };
  //add new job
  addNewJobApi(data){
    return request({
      url: "/cong-viec",
      method: "POST",
      data,
    });
  };
  //getDetailJob
  getJobDetailApi(id) {
    return request({
      url: `/cong-viec/${id}`,
      method: "GET",
    });
  };
  //uploadImage
  uploadImageApi(id,formData){
    return request({
      url: `/cong-viec/upload-hinh-cong-viec/${id}`,
      method: "POST",
      formFile: formData,
    });
  };
}
export const jobService = new JobService();
