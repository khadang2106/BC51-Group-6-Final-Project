import { request } from '../configs/api';

class JobService {
  //đã dùng để lấy danh sách job
  fetchJobList(){
    return request({
      url: "/cong-viec",
      method: "GET",
    });
  };
}
export const jobService = new JobService();
