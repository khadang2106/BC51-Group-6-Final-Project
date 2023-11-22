
import { jobService } from "../../services/job";
import { DELETE_JOB } from "../types/userType";

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
