import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useJobTypeList from "../../hooks/useJobTypeList";
import {
  deleteJobTypeAction,
  updateJobTypeAction,
} from "../../store/actions/jobTypeAction";
import { jobTypeService } from "../../services/jobType";

export default function UserManagement() {
  const jobTypeList = useJobTypeList();
  const dispatch = useDispatch();
  //hàm handlechange và handlesubmit add new jobtype
  const [stateJobType, setStateJobType] = useState({
    id: "",
    tenLoaiCongViec: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateJobType({
      ...stateJobType,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation email trong admin
    isValid &= validationRequired(
      stateJobType.tenLoaiCongViec,
      tenLoaiCongViecRef,
      "Tên loại công việc không được để trống!"
    );
    if (isValid) {
      const dataAddJobType = { ...stateJobType, id: 0 };
      try {
        if (
          window.confirm(
            `Bạn có chắc muốn thêm loại công việc ${dataAddJobType.tenLoaiCongViec} này không?`
          )
        ) {
          const response = await jobTypeService.addNewJobTypeApi(
            dataAddJobType
          );
          if (response && response.data.statusCode === 201) {
            alert("Thêm loại công việc thành công!");
            document.getElementById("closeAddJobType").click();
          }
        }
      } catch (error) {
        console.error("Lỗi khi thêm loại công việc:", error);
        alert("Có lỗi xảy ra khi thêm loại công việc. Vui lòng thử lại.");
      }
    }
  };
  //reset form add job type
  const resetModalState = () => {
    setStateJobType({
      tenLoaiCongViec: "", 
    });
    document.getElementById("tenLoaiCongViecInput").value = "";
    tenLoaiCongViecRef.current.innerHTML = "";
  };
  //reset form update job type
  const resetFormUpdateJobType = () => {
    setStateJobType({
      tenLoaiCongViec: "", 
    });
    document.getElementById("updateJobTypeInput").value = "";
    updateTenLoaiCongViecRef.current.innerHTML = "";
  };
  //validation check rỗng
  const tenLoaiCongViecRef = useRef(null);
  const updateTenLoaiCongViecRef = useRef(null);
  const validationRequired = (value, ref, message) => {
    if (value) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm này khi click vào  Edit lấy thông tin từ API show ra form
  const handleEditClick = async (id) => {
    resetFormUpdateJobType();
    try {
      const getJobTypeDetail = await jobTypeService.getJobTypeDetailApi(id);
      if (getJobTypeDetail.data.statusCode === 200) {
        setStateJobType(getJobTypeDetail.data.content);
      } else {
        console.error(
          "Lỗi lấy thông tin chi tiết loại công việc:",
          getJobTypeDetail.data
        );
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin api", error);
    }
  };
  //handlechange và handlesubmit update Jobtype
  const handleChangeUpdateJobType = (event) => {
    const { name, value } = event.target;
    setStateJobType({
      ...stateJobType,
      [name]: value,
    });
  };
  const handleSubmitUpdateJobType = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation job type trong update
    isValid &= validationRequired(
      stateJobType.tenLoaiCongViec,
      updateTenLoaiCongViecRef,
      "Tên loại công việc không được để trống!"
    );
    if (isValid) {
      try {
        if (
          window.confirm(
            `Bạn có chắc muốn cập nhật loại công việc ${stateJobType.tenLoaiCongViec} này không?`
          )
        ) {
          await dispatch(updateJobTypeAction({ ...stateJobType }));
        }
      } catch (error) {
        console.error("Lỗi khi thêm loại công việc:", error);
        alert("Có lỗi xảy ra khi thêm loại công việc. Vui lòng thử lại.");
      }
    }
  };
  //hàm phân trang 10 job type 1 page
  const [currentPage, setCurrentPage] = useState(1);
  const jobTypePerPage = 10;
  const indexOfLastUser = currentPage * jobTypePerPage;
  const indexOfFirstUser = indexOfLastUser - jobTypePerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobTypeList.length / jobTypePerPage); i++) {
    pageNumbers.push(i);
  }
  const currentUsers = jobTypeList.slice(indexOfFirstUser, indexOfLastUser);
  //hàm rendercontent
  const renderContent = () => {
    return currentUsers.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.id}</td>
          <td>{element.tenLoaiCongViec}</td>
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
                    `Bạn có chắc muốn xóa loại công việc ${element.tenLoaiCongViec} không?`
                  )
                ) {
                  const result = await dispatch(deleteJobTypeAction(element));
                  if (result && result.success) {
                    alert("Xóa loại công việc thành công!");
                  } else {
                    alert("Có lỗi xảy ra khi xóa loại công việc!");
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
        QUẢN LÝ LOẠI CÔNG VIỆC
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
            Danh Sách Loại Công Việc
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
                <i className="fa fa-plus mr-1" /> ADD NEW JOB TYPE
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
                  <th>Job Type</th>
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
                      Math.ceil(jobTypeList.length / jobTypePerPage) ||
                    jobTypeList.length <= jobTypePerPage
                      ? "page-item disabled"
                      : "page-item"
                  }
                  onClick={() => {
                    if (
                      currentPage !==
                      Math.ceil(jobTypeList.length / jobTypePerPage)
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
                ADD NEW JOB TYPE
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeAddJobType"
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
                    disabled="true"
                  />
                </div>
                {/* Job Type */}
                <div className="form-group">
                  <label className="font-weight-bold">Job Type</label>
                  <input
                    onChange={handleChange}
                    name="tenLoaiCongViec"
                    className="form-control"
                    id="tenLoaiCongViecInput"
                  />
                  <span ref={tenLoaiCongViecRef} className="text-danger"></span>
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
                UPDATE JOB TYPE
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeUpdateJobType"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmitUpdateJobType}>
                {/* ID */}
                <div className="form-group ">
                  <label className="font-weight-bold">ID</label>
                  <input
                    value={stateJobType.id}
                    name="id"
                    className="form-control"
                    disabled="true"
                  />
                </div>
                {/* Job Type */}
                <div className="form-group">
                  <label className="font-weight-bold">Job Type</label>
                  <input
                    value={stateJobType.tenLoaiCongViec}
                    name="tenLoaiCongViec"
                    className="form-control"
                    onChange={handleChangeUpdateJobType}
                    id="updateJobTypeInput"
                  />
                  <span
                    ref={updateTenLoaiCongViecRef}
                    className="text-danger"
                  ></span>
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
