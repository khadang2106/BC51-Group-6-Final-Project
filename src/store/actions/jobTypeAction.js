import { jobTypeService } from '../../services/jobType';
import { DELETE_JOBTYPE, UPDATE_JOBTYPE } from '../types/jobTypeType';

// nhấn nút delete job type
export const deleteJobTypeAction = (jobType) => async (dispatch) => {
  try {
    console.log(jobType);
    const response = await jobTypeService.deleteJobTypeApi(jobType.id);
    if (response.data.statusCode === 200) {
      dispatch({
        type: DELETE_JOBTYPE,
        payload: jobType,
      });
      return { success: true };
    } else {
      console.error('Error deleting user:', response.data);
      return { success: false };
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false };
  }
};
// update job type
export const updateJobTypeAction = (jobTypeData) => async (dispatch) => {
  try {
    const { id, ...updateJobType } = jobTypeData;
    const response = await jobTypeService.updateJobType(id, updateJobType);
    if (response.data.statusCode === 200) {
      dispatch({
        type: UPDATE_JOBTYPE,
        payload: jobTypeData,
      });
      alert('Cập nhật loại công việc thành công!');
      document.getElementById('closeUpdateJobType').click();
    } else {
      console.error('Lỗi cập nhật loại công việc:', response.data);
    }
  } catch (error) {
    console.error('Lỗi call api:', error);
  }
};
