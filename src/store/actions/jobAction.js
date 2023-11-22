
import { jobService } from "../../services/job";
import { DELETE_JOB, UPDATE_JOB } from "../types/jobType";


// nhấn nút delete job
export const deleteJobAction = (job) => async (dispatch) => {
  try {
    const response = await jobService.deleteJobApi(job.id);
    if (response.data.statusCode === 200) {
      dispatch({
        type: DELETE_JOB,
        payload: job,
      });
      return { success: true };
    } else {
      console.error("Error deleting user:", response.data);
      return { success: false };
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false };
  }
};
// update job
export const updateJobAction = (job) => async (dispatch) => {
  try {
    const { id, ...updateJob } = job; 
    const response = await jobService.updateJob(id,updateJob);
    if (response.data.statusCode === 200) {
      dispatch({
        type: UPDATE_JOB,
        payload: job,
      });
      alert("Cập nhật công việc thành công!");
      document.getElementById("closeUpdateJob").click();
    } else {
      console.error("Lỗi cập nhật công việc:", response.data);
    }
  } catch (error) {
    console.error("Lỗi call api:", error);
  }
};