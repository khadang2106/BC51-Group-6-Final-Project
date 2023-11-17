import { request } from '../configs/api';

class ServiceService {
  //đã dùng để lấy danh sách loại công việc
  fetchServiceList(){
    return request({
      url: "/thue-cong-viec",
      method: "GET",
    });
  };
}
export const serviceService = new ServiceService();
