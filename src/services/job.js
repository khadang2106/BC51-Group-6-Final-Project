import { request } from '../configs/api';

class JobService {
  fetchJobMenuApi() {
    return request({
      url: '/cong-viec/lay-menu-loai-cong-viec',
      method: 'GET',
    });
  }

  fetchJobCategoriesByIdApi(id) {
    return request({
      url: `/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`,
      method: 'GET',
    });
  }

  fetchCategoriesDetailByIdApi(id) {
    return request({
      url: `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`,
      method: 'GET',
    });
  }

  fetchJobDetailApi(id) {
    return request({
      url: `/cong-viec/lay-cong-viec-chi-tiet/${id}`,
      method: 'GET',
    });
  }

  fetchJobListByNameApi(str) {
    return request({
      url: `/cong-viec/lay-danh-sach-cong-viec-theo-ten/${str}`,
      method: 'GET',
    });
  }
}

export const jobService = new JobService();
