import { request } from '../configs/api';

class HireJob {
  fetchHireJobListApi() {
    return request({
      url: '/thue-cong-viec/lay-danh-sach-da-thue',
      method: 'GET',
    });
  }

  deleteHireJobApi(id) {
    return request({
      url: `/thue-cong-viec/${id}`,
      method: 'DELETE',
    });
  }

  hireJobApi(data) {
    return request({
      url: `/thue-cong-viec`,
      method: 'POST',
      data,
    });
  }
}

export const hireJob = new HireJob();
