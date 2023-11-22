import { serviceService } from "../../services/service";
import { DELETE_JOBSERVICE, UPDATE_JOBSERVICE } from "../types/serviceType";


// nhấn nút delete job service
export const deleteJobServiceAction = (jobService) => async (dispatch) => {
  try {
    console.log(jobService);
    const response = await serviceService.deleteJobServiceApi(jobService.id);
    if (response.data.statusCode === 200) {
      dispatch({
        type: DELETE_JOBSERVICE,
        payload: jobService,
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
// update job type
export const updateJobServiceAction = (jobServiceData) => async (dispatch) => {
    try {
      const { id, ...updateJobService } = jobServiceData; 
      const response = await serviceService.updateJobService(id,updateJobService);
      if (response.data.statusCode === 200) {
        dispatch({
          type: UPDATE_JOBSERVICE,
          payload: jobServiceData,
        });
        alert("Cập nhật thuê công việc thành công!");
        document.getElementById("closeUpdateJobService").click();
      } else {
        console.error("Lỗi cập nhật thuê công việc:", response.data);
      }
    } catch (error) {
      console.error("Lỗi call api:", error);
    }
  };