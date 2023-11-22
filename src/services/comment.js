import { request } from '../configs/api';

class CommentService {
  fetchCommentByJobApi(id) {
    return request({
      url: `/binh-luan/lay-binh-luan-theo-cong-viec/${id}`,
      method: 'GET',
    });
  }

  leaveCommentApi(data) {
    return request({
      url: `/binh-luan`,
      method: 'POST',
      data,
    });
  }
}

export const commentService = new CommentService();
