import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useServiceList from "../../hooks/useServiceList";
import {
  deleteJobServiceAction,
  updateJobServiceAction,
} from "../../store/actions/jobServiceAction";
import { serviceService } from "../../services/service";

export default function UserManagement() {
  const serviceList = useServiceList();
  const dispatch = useDispatch();
  const [stateJobSevice, setStateJobService] = useState({
    id: "",
    maCongViec: "",
    maNguoiThue: "",
    ngayThue: "",
  });
  //hàm handlechange và handlesubmit add new service
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateJobService({
      ...stateJobSevice,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation job id trong add new service
    isValid &=
      validationRequired(
        stateJobSevice.maCongViec,
        jobIdRef,
        "Mã công việc không được để trống!"
      ) &&
      validationNumber(
        stateJobSevice.maCongViec,
        jobIdRef,
        "Vui lòng nhập mã công việc bằng chữ số!"
      );
    //validation hirer id trong add new service
    isValid &=
      validationRequired(
        stateJobSevice.maNguoiThue,
        hirerIdRef,
        "Mã người thuê không được để trống!"
      ) &&
      validationNumber(
        stateJobSevice.maNguoiThue,
        hirerIdRef,
        "Vui lòng nhập mã người thuê bằng chữ số!"
      );
    //validation hirer date trong add new service
    isValid &=
      validationRequired(
        stateJobSevice.ngayThue,
        hirerDateRef,
        "Ngày thuê không được để trống!"
      ) &&
      validationDate(
        stateJobSevice.ngayThue,
        hirerDateRef,
        "Vui lòng nhập ngày thuê đúng định dạng ngày/tháng/năm!"
      );

    if (isValid) {
      try {
        const dataAddNewService = { ...stateJobSevice, id: 0 };
        if (
          window.confirm(
            `Bạn có chắc muốn thêm thuê công việc ${dataAddNewService.maCongViec} này không?`
          )
        ) {
          const response = await serviceService.addNewJobServiceApi(
            dataAddNewService
          );
          if (response.data.statusCode === 201) {
            alert("Thêm thuê công việc thành công!");
            document.getElementById("closeAddNewService").click();
          }
        }
      } catch (error) {
        console.error("Lỗi khi thêm thuê công việc:", error);
        alert("Có lỗi xảy ra khi thêm thuê công việc. Vui lòng thử lại.");
      }
    }
  };
  //validation check rỗng
  const jobIdRef = useRef(null);
  const hirerIdRef = useRef(null);
  const hirerDateRef = useRef(null);
  const jobIdUpdateRef = useRef(null);
  const hirerIdUpdateRef = useRef(null);
  const hirerDateUpdateRef = useRef(null);
  const validationRequired = (value, ref, message) => {
    if (value) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //validation check number
  const validationNumber = (value, ref, message) => {
    if (/^[0-9]+$/.test(value)) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm check validation ngày/tháng/năm
  const validationDate = (value, ref, message) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (dateRegex.test(value)) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm này khi click vào View và Edit lấy thông tin từ API show ra form
  const handleEditClick = async (id) => {
    // resetFormUpdateUser();
    try {
      const getJobServiceDetail = await serviceService.getJobServiceDetailApi(
        id
      );
      if (getJobServiceDetail.data.statusCode === 200) {
        setStateJobService(getJobServiceDetail.data.content);
      } else {
        console.error(
          "Lỗi lấy thông tin chi tiết user:",
          getJobServiceDetail.data
        );
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin api", error);
    }
  };
  //hàm handlechange và handlesubmit update job service
  const handleChangeUpdateJobService = (event) => {
    const { name, value } = event.target;
    setStateJobService({
      ...stateJobSevice,
      [name]: value,
    });
  };
  const handleSubmitUpdateJobService = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation job id trong add new service
    isValid &= validationRequired(
      stateJobSevice.maCongViec,
      jobIdUpdateRef,
      "Mã công việc không được để trống!"
    ) && validationNumber(stateJobSevice.maCongViec,
      jobIdUpdateRef,
      "Vui lòng nhập mã công việc bằng chữ số!");
    //validation hirer id trong add new service
    isValid &= validationRequired(
      stateJobSevice.maNguoiThue,
      hirerIdUpdateRef,
      "Mã người thuê không được để trống!"
    ) && validationNumber(stateJobSevice.maNguoiThue,
      hirerIdUpdateRef,
      "Vui lòng nhập mã người thuê bằng chữ số!");
    //validation job id trong add new service
    isValid &= validationRequired(
      stateJobSevice.ngayThue,
      hirerDateUpdateRef,
      "Ngày thuê không được để trống!"
    ) && validationDate(stateJobSevice.ngayThue,
      hirerDateUpdateRef,
      "Vui lòng nhập ngày thuê đúng định dạng ngày/tháng/năm!");

    if (isValid) {
      try {
        const dataUpdateJobService = { ...stateJobSevice, id: 0 };
        if (
          window.confirm(
            `Bạn có chắc muốn cập nhật thuê công việc ${dataUpdateJobService.maCongViec} này không?`
          )
        ) {
          await dispatch(updateJobServiceAction({ ...stateJobSevice }));
        }
      } catch (error) {
        console.error("Lỗi khi thêm thuê công việc:", error);
        alert("Có lỗi xảy ra khi thêm thuê công việc. Vui lòng thử lại.");
      }
    }
  };
  //hàm phân trang 10 job type 1 page
  const [currentPage, setCurrentPage] = useState(1);
  const jobServicePerPage = 50;
  const indexOfLastUser = currentPage * jobServicePerPage;
  const indexOfFirstUser = indexOfLastUser - jobServicePerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(serviceList.length / jobServicePerPage); i++) {
    pageNumbers.push(i);
  }
  const currentUsers = serviceList.slice(indexOfFirstUser, indexOfLastUser);
  //reset form add job type
  const resetModalState = () => {
    setStateJobService({
      id: "",
      maCongViec: "",
      maNguoiThue: "",
      ngayThue: "",
    });
    document.getElementById("jobIdServiceInput").value = "";
    document.getElementById("hirerIdServiceInput").value = "";
    document.getElementById("hirerDateServiceInput").value = "";
    jobIdRef.current.innerHTML = "";
    hirerIdRef.current.innerHTML = "";
    hirerDateRef.current.innerHTML = "";
  };
  //hàm rendercontent
  const renderContent = () => {
    return currentUsers.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.id}</td>
          <td>{element.maCongViec}</td>
          <td>{element.maNguoiThue}</td>
          <td>{element.ngayThue}</td>
          <td>{element.hoanThanh ? "Hoàn thành" : "Chưa hoàn thành"}</td>
          <td>
            <button
              className="btn btn-info mr-2 "
              data-toggle="modal"
              data-target="#myModal2"
              onClick={() => {
                handleEditClick(element.id);
              }}
            >
              VIEW & EDIT
            </button>
            <button
              onClick={async () => {
                if (
                  window.confirm(
                    `Bạn có chắc muốn xóa thuê công việc ${element.maCongViec} này không?`
                  )
                ) {
                  const result = await dispatch(
                    deleteJobServiceAction(element)
                  );
                  if (result && result.success) {
                    alert("Xóa người dùng thành công!");
                  } else {
                    alert("Có lỗi xảy ra khi xóa người dùng!");
                  }
                }
              }}
              className="btn btn-danger"
            >
              DELETE
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <h2
        style={{
          textAlign: "center",
          color: "rgb(245, 48, 48)",
          fontSize: 40,
          fontWeight: "bold",
          paddingTop: 20,
        }}
      >
        QUẢN LÝ THUÊ CÔNG VIỆC
      </h2>
      {/* Phan tab menu */}
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <span
            className="nav-link active"
            role="tab"
            data-toggle="tab"
            style={{ fontWeight: 800 }}
          >
            Danh Sách Thuê Công Việc
          </span>
        </li>
      </ul>
      <br />
      {/* Tab panes */}
      <div className="tab-content">
        {/*Danh sách đối tượng */}
        <div role="tabpanel" className="tab-pane in active">
          <div className="row">
            <div
              className="col-8 d-flex justify-content-end "
              style={{ height: 40, marginBottom: "16px" }}
            >
              {/* BEGIN BUTTOM THÊM MỚI */}
              <button
                id="btnAddUser"
                className="btn btn-success mr-auto"
                data-toggle="modal"
                data-target="#myModal"
                onClick={resetModalState}
              >
                <i className="fa fa-plus mr-1" /> ADD NEW SERVICE
              </button>
              {/* END BUTTON THÊM MỚI */}
            </div>
          </div>
          <div className="clear-fix" />
          <div>
            {/* BEGIN TABLE SẢN PHẨM */}
            <div className="loader" id="loader" />
            <table className="table table-bordered">
              <thead align="center">
                <tr>
                  <th>ID</th>
                  <th>Job ID</th>
                  <th>Hirer ID</th>
                  <th>Hirer Day</th>
                  <th>Condition</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderContent()}</tbody>
            </table>
            {/**hiển thị next previous trong ul này */}
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "page-item disabled" : "page-item"
                }
                onClick={() => {
                  if (currentPage !== 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
              >
                <span className="page-link">Previous</span>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={
                    currentPage === number ? "page-item active" : "page-item"
                  }
                  onClick={() => handlePageChange(number)}
                >
                  <span className="page-link">{number}</span>
                </li>
              ))}
              <li
                className={
                  currentPage ===
                    Math.ceil(serviceList.length / jobServicePerPage) ||
                  serviceList.length <= jobServicePerPage
                    ? "page-item disabled"
                    : "page-item"
                }
                onClick={() => {
                  if (
                    currentPage !==
                    Math.ceil(serviceList.length / jobServicePerPage)
                  ) {
                    handlePageChange(currentPage + 1);
                  }
                }}
              >
                <span className="page-link">Next</span>
              </li>
            </ul>
          </div>
          <br />
        </div>
      </div>
      {/*KetThuc Tabmenu*/}

      {/* The Modal 1*/}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title font-weight-bold text-danger">
                ADD NEW SERVICE
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeAddNewService"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* ID */}
                <div className="form-group ">
                  <label className="font-weight-bold">ID</label>
                  <input
                    onChange={handleChange}
                    name="id"
                    className="form-control"
                    value={0}
                    disabled={true}
                  />
                </div>
                {/* Job ID */}
                <div className="form-group">
                  <label className="font-weight-bold">Job ID</label>
                  <input
                    onChange={handleChange}
                    name="maCongViec"
                    className="form-control"
                    id="jobIdServiceInput"
                  />
                  <span ref={jobIdRef} className="text-danger"></span>
                </div>
                {/* Hirer ID */}
                <div className="form-group">
                  <label className="font-weight-bold">Hirer ID</label>
                  <input
                    onChange={handleChange}
                    name="maNguoiThue"
                    className="form-control"
                    id="hirerIdServiceInput"
                  />
                  <span ref={hirerIdRef} className="text-danger"></span>
                </div>
                {/* Hirer Date */}
                <div className="form-group">
                  <label className="font-weight-bold">Hire Date</label>
                  <input
                    onChange={handleChange}
                    name="ngayThue"
                    className="form-control"
                    id="hirerDateServiceInput"
                  />
                  <span ref={hirerDateRef} className="text-danger"></span>
                </div>
                {/* Condition */}
                <div className="form-group">
                  <label className="font-weight-bold">Condition</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="complete"
                      name="condition"
                      className="form-check-input"
                      value="complete"
                      //onchange này là để khi chọn tick thì lấy giá trị true false
                      onChange={() =>
                        setStateJobService({
                          ...stateJobSevice,
                          hoanThanh: true,
                        })
                      }
                    />
                    <label htmlFor="complete" className="form-check-label">
                      Complete
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="incomplete"
                      name="condition"
                      className="form-check-input"
                      value="incomplete"
                      checked={stateJobSevice.hoanThanh === false}
                      onChange={() =>
                        setStateJobService({
                          ...stateJobSevice,
                          hoanThanh: false,
                        })
                      }
                    />
                    <label htmlFor="incomplete" className="form-check-label">
                      Incomplete
                    </label>
                  </div>
                </div>
                {/** Button Thêm */}
                <div className="text-right">
                  <button className="btn btn-success">ADD</button>
                </div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer" id="cancel" />
          </div>
        </div>
      </div>

      {/**The Modal 2 */}
      <div className="modal fade" id="myModal2">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title font-weight-bold text-danger">
                UPDATE SERVICE
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeUpdateJobService"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmitUpdateJobService}>
                {/* ID */}
                <div className="form-group ">
                  <label className="font-weight-bold">ID</label>
                  <input
                    name="id"
                    className="form-control"
                    value={stateJobSevice.id}
                    disabled="true"
                  />
                </div>
                {/* Job ID */}
                <div className="form-group">
                  <label className="font-weight-bold">Job ID</label>
                  <input
                    name="maCongViec"
                    className="form-control"
                    value={stateJobSevice.maCongViec}
                    onChange={handleChangeUpdateJobService}
                  />
                  <span ref={jobIdUpdateRef} className="text-danger"></span>
                </div>
                {/* Hirer ID */}
                <div className="form-group">
                  <label className="font-weight-bold">Hirer ID</label>
                  <input
                    name="maNguoiThue"
                    className="form-control"
                    value={stateJobSevice.maNguoiThue}
                    onChange={handleChangeUpdateJobService}
                  />
                  <span ref={hirerIdUpdateRef} className="text-danger"></span>
                </div>
                {/* Hire Date */}
                <div className="form-group">
                  <label className="font-weight-bold">Hire Date</label>
                  <input
                    name="ngayThue"
                    className="form-control"
                    value={stateJobSevice.ngayThue}
                    onChange={handleChangeUpdateJobService}
                  />
                  <span ref={hirerDateUpdateRef} className="text-danger"></span>
                </div>
                {/* Condition */}
                <div className="form-group">
                  <label className="font-weight-bold">Condition</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="complete"
                      name="condition2"
                      className="form-check-input"
                      value="complete"
                      //còn cái checked này là để lấy thông tin từ state show ra form lại
                      checked={stateJobSevice.hoanThanh === true}
                      onChange={() =>
                        setStateJobService({
                          ...stateJobSevice,
                          hoanThanh: true,
                        })
                      }
                    />
                    <label htmlFor="complete" className="form-check-label">
                      Complete
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="incomplete"
                      name="condition2"
                      className="form-check-input"
                      value="incomplete"
                      checked={stateJobSevice.hoanThanh === false}
                      onChange={() =>
                        setStateJobService({
                          ...stateJobSevice,
                          hoanThanh: false,
                        })
                      }
                    />
                    <label htmlFor="incomplete" className="form-check-label">
                      Incomplete
                    </label>
                  </div>
                </div>
                {/** Button Thêm */}
                <div className="text-right">
                  <button className="btn btn-danger">UPDATE</button>
                </div>
              </form>
            </div>
            {/* Modal footer */}
            <div className="modal-footer" id="cancel" />
          </div>
        </div>
      </div>
    </div>
  );
}
