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

  //đã dùng để lấy danh sách job
  fetchJobList() {
    return request({
      url: '/cong-viec',
      method: 'GET',
    });
  }
  //delete job
  deleteJobApi(id) {
    return request({
      url: `/cong-viec/${id}`,
      method: 'DELETE',
    });
  }
  //add new job
  addNewJobApi(data) {
    return request({
      url: '/cong-viec',
      method: 'POST',
      data,
    });
  }
  //getDetailJob
  getJobDetailApi(id) {
    return request({
      url: `/cong-viec/${id}`,
      method: 'GET',
    });
  }
  //uploadImage
  uploadImageApi(id, data) {
    return request({
      url: `/cong-viec/upload-hinh-cong-viec/${id}`,
      method: 'POST',
       data,
    });
  }
  //update Job
  updateJob(id,data) {
    return request({
      url: `/cong-viec/${id}`,
      method: "PUT",
      data,
    });
  };
}

export const jobService = new JobService();
