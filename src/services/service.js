import { request } from '../configs/api';

class ServiceService {
  //đã dùng để lấy danh sách thuê công việc
  fetchServiceList(){
    return request({
      url: "/thue-cong-viec",
      method: "GET",
    });
  };
  //delete jobservice
  deleteJobServiceApi(id) {
    return request({
      url: `/thue-cong-viec/${id}`,
      method: "DELETE",
  });
  };
  //add new job service
  addNewJobServiceApi(data){
    return request({
      url: "/thue-cong-viec",
      method: "POST",
      data,
    });
  };
  //getDetail JobService
  getJobServiceDetailApi(id) {
    return request({
      url: `/thue-cong-viec/${id}`,
      method: "GET",
    });
  };
  //update JobService
  updateJobService(id,data) {
    return request({
      url: `/thue-cong-viec/${id}`,
      method: "PUT",
      data,
    });
  };
}
export const serviceService = new ServiceService();
