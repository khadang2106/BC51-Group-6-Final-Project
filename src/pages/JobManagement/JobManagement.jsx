import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useJobList from "../../hooks/useJobList";
import {
  deleteJobAction,
  updateJobAction,
} from "../../store/actions/jobAction";
import { jobService } from "../../services/job";
import { notification } from "antd";

export default function UserManagement() {
  const jobList = useJobList();
  const dispatch = useDispatch();
  //useState cho addJob
  const [addJob, setAddJob] = useState({
    tenCongViec: "",
    moTa: "",
    moTaNgan: "",
    giaTien: "",
    danhGia: "",
    maChiTietLoaiCongViec: "",
    saoCongViec: "",
  });
  //useState cho updateJob
  const [updateJob, setUpdateJob] = useState({
    tenCongViec: "",
    moTa: "",
    moTaNgan: "",
    giaTien: "",
    danhGia: "",
    maChiTietLoaiCongViec: "",
    saoCongViec: "",
  });
  //hàm handlechange và handlesubmit add new job
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddJob({
      ...addJob,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation nameJob trong add new job
    isValid &= validationRequired(
      addJob.tenCongViec,
      nameJobRef,
      "Name Job không được để trống!"
    );
    //validation discriptionJob trong add new job
    isValid &= validationRequired(
      addJob.moTa,
      discriptionJobRef,
      "Discription không được để trống!"
    );
    //validation shortDiscriptionJob trong add new job
    isValid &= validationRequired(
      addJob.moTaNgan,
      shortDiscriptionJobRef,
      "Short Discription không được để trống!"
    );
    //validation price trong add new job
    isValid &=
      validationRequired(
        addJob.giaTien,
        priceJobRef,
        "Price không được để trống!"
      ) &&
      validationNumber(
        addJob.giaTien,
        priceJobRef,
        "Vui lòng nhập price bằng chữ số!"
      );
    //validation rate trong add new job
    isValid &=
      validationRequired(
        addJob.danhGia,
        rateJobRef,
        "Rate không được để trống!"
      ) &&
      validationNumber(
        addJob.danhGia,
        rateJobRef,
        "Vui lòng nhập Rate bằng chữ số!"
      ) &&
      validationCheckNumberRate(
        addJob.danhGia,
        rateJobRef,
        "Vui lòng nhập Rate từ 0 đến 10!"
      );
    //validation detail code trong add new job
    isValid &=
      validationRequired(
        addJob.maChiTietLoaiCongViec,
        detailCodeJobRef,
        "Detail code không được để trống!"
      ) &&
      validationNumber(
        addJob.maChiTietLoaiCongViec,
        detailCodeJobRef,
        "Vui lòng nhập detail code bằng chữ số!"
      );
    //validation star ratting
    isValid &=
      validationRequired(
        addJob.saoCongViec,
        starRattingJobRef,
        "Star Ratting không được để trống!"
      ) &&
      validationNumber(
        addJob.saoCongViec,
        starRattingJobRef,
        "Vui lòng nhập star ratting bằng chữ số!"
      ) &&
      validationCheckNumberStarRatting(
        addJob.saoCongViec,
        starRattingJobRef,
        "Vui lòng nhập star ratting từ 1 đến 5!"
      );
    if (isValid) {
      const dataAddNewJob = { ...addJob };
      try {
        if (
          window.confirm(
            `Bạn có chắc muốn thêm công việc ${dataAddNewJob.tenCongViec} này không?`
          )
        ) {
          const response = await jobService.addNewJobApi(dataAddNewJob);
          if (response && response.data.statusCode === 201) {
            alert("Thêm công việc thành công!");
            document.getElementById("closeAddJob").click();
          }
        }
      } catch (error) {
        console.error("Lỗi khi thêm công việc:", error);
        alert("Có lỗi xảy ra khi thêm công việc. Vui lòng thử lại.");
      }
    }
  };
  //hàm reset data form và reset error add new job
  const resetModalState = () => {
    setAddJob({
      tenCongViec: "",
      moTa: "",
      moTaNgan: "",
      giaTien: "",
      danhGia: "",
      maChiTietLoaiCongViec: "",
      saoCongViec: "",
    });
    document.getElementById("nameJobInput").value = "";
    document.getElementById("discriptionJobInput").value = "";
    document.getElementById("shortDiscriptionJobInput").value = "";
    document.getElementById("priceJobInput").value = "";
    document.getElementById("rateJobInput").value = "";
    document.getElementById("detailCodeJobInput").value = "";
    document.getElementById("starRattingJobInput").value = "";
    nameJobRef.current.innerHTML = "";
    discriptionJobRef.current.innerHTML = "";
    shortDiscriptionJobRef.current.innerHTML = "";
    priceJobRef.current.innerHTML = "";
    rateJobRef.current.innerHTML = "";
    detailCodeJobRef.current.innerHTML = "";
    starRattingJobRef.current.innerHTML = "";
  };
  const resetFormUpdateJob = () => {
    setUpdateJob({
      tenCongViec: "",
      moTa: "",
      moTaNgan: "",
      giaTien: "",
      danhGia: "",
      maChiTietLoaiCongViec: "",
      saoCongViec: "",
    });
    document.getElementById("updateNameJobInput").value = "";
    document.getElementById("updateDiscriptionJobInput").value = "";
    document.getElementById("updateShortDiscriptionJobInput").value = "";
    document.getElementById("updatePriceJobInput").value = "";
    document.getElementById("updateRateJobInput").value = "";
    document.getElementById("updateDetailCodeJobInput").value = "";
    document.getElementById("updateStarRattingJobInput").value = "";
    updateNameRef.current.innerHTML = "";
    updateDiscriptionRef.current.innerHTML = "";
    updateShortDiscriptionRef.current.innerHTML = "";
    updatePriceRef.current.innerHTML = "";
    updateRateRef.current.innerHTML = "";
    updateDetailCodeRef.current.innerHTML = "";
    updateStarRattingRef.current.innerHTML = "";
  };
  //khai báo để validation
  const nameJobRef = useRef(null);
  const discriptionJobRef = useRef(null);
  const shortDiscriptionJobRef = useRef(null);
  const priceJobRef = useRef(null);
  const rateJobRef = useRef(null);
  const detailCodeJobRef = useRef(null);
  const starRattingJobRef = useRef(null);
  const updateNameRef = useRef(null);
  const updateDiscriptionRef = useRef(null);
  const updateShortDiscriptionRef = useRef(null);
  const updatePriceRef = useRef(null);
  const updateRateRef = useRef(null);
  const updateDetailCodeRef = useRef(null);
  const updateStarRattingRef = useRef(null);
  //validation check rỗng
  const validationRequired = (value, ref, message) => {
    if (value) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm check validation number
  const validationNumber = (value, ref, message) => {
    if (/^[0-9]+$/.test(value)) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  const validationCheckNumberRate = (value, ref, message) => {
    const rateValue = parseFloat(value);
    if (!isNaN(rateValue) && rateValue >= 0 && rateValue <= 10) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  const validationCheckNumberStarRatting = (value, ref, message) => {
    const rateValue = parseFloat(value);
    if (!isNaN(rateValue) && rateValue >= 1 && rateValue <= 5) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm này khi click vào Edit lấy thông tin chi tiết Job show form
  const handleEditClick = async (id) => {
    resetFormUpdateJob();
    try {
      const getJobDetail = await jobService.getJobDetailApi(id);
      if (getJobDetail.data.statusCode === 200) {
        setUpdateJob(getJobDetail.data.content);
      } else {
        console.error("Lỗi lấy thông tin chi tiết user:", getJobDetail.data);
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin api", error);
    }
  };
  //hàm handlechange và handlesubmit update job
  const handleChangeUpdateJob = (event) => {
    const { name, value } = event.target;
    setUpdateJob({
      ...updateJob,
      [name]: value,
    });
  };
  const handleSubmitUpdateJob = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation nameJob trong update job
    isValid &= validationRequired(
      updateJob.tenCongViec,
      updateNameRef,
      "Name Job không được để trống!"
    );
    //validation discriptionJob trong update job
    isValid &= validationRequired(
      updateJob.moTa,
      updateDiscriptionRef,
      "Discription không được để trống!"
    );
    //validation shortDiscriptionJob trong update job
    isValid &= validationRequired(
      updateJob.moTaNgan,
      updateShortDiscriptionRef,
      "Short Discription không được để trống!"
    );
    //validation price trong update job
    isValid &=
      validationRequired(
        updateJob.giaTien,
        updatePriceRef,
        "Price không được để trống!"
      ) &&
      validationNumber(
        updateJob.giaTien,
        updatePriceRef,
        "Vui lòng nhập price bằng chữ số!"
      );
    //validation rate trong update job
    isValid &=
      validationRequired(
        updateJob.danhGia,
        updateRateRef,
        "Rate không được để trống!"
      ) &&
      validationNumber(
        updateJob.danhGia,
        updateRateRef,
        "Vui lòng nhập Rate bằng chữ số!"
      ) &&
      validationCheckNumberRate(
        updateJob.danhGia,
        updateRateRef,
        "Vui lòng nhập Rate từ 0 đến 10!"
      );
    //validation detail code trong update job
    isValid &=
      validationRequired(
        updateJob.maChiTietLoaiCongViec,
        updateDetailCodeRef,
        "Detail code không được để trống!"
      ) &&
      validationNumber(
        updateJob.maChiTietLoaiCongViec,
        updateDetailCodeRef,
        "Vui lòng nhập detail code bằng chữ số!"
      );
    //validation star ratting trong update job
    isValid &=
      validationRequired(
        updateJob.saoCongViec,
        updateStarRattingRef,
        "Star Ratting không được để trống!"
      ) &&
      validationNumber(
        updateJob.saoCongViec,
        updateStarRattingRef,
        "Vui lòng nhập star ratting bằng chữ số!"
      ) &&
      validationCheckNumberStarRatting(
        updateJob.saoCongViec,
        updateStarRattingRef,
        "Vui lòng nhập star ratting từ 1 đến 5!"
      );
    if (isValid) {
      try {
        if (
          window.confirm(
            `Bạn có chắc cập nhật công việc ${updateJob.tenCongViec} này không?`
          )
        ) {
          await dispatch(updateJobAction({ ...updateJob }));
        }
      } catch (error) {
        console.error("Lỗi khi thêm công việc:", error);
        alert("Có lỗi xảy ra khi thêm công việc. Vui lòng thử lại.");
      }
    }
  };
  //hàm upload hình ảnh
  const [imgSrc, setImgSrc] = useState(null);
  const [imgSrcApi, setImgSrcApi] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/jpg"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //base 64
      };
      setImgFile(file);
    }
  };
  //hàm lấy id công việc khi nhấn nút Image
  const [currentJobId, setCurrentJobId] = useState(null);
  const AddImg = async () => {
    if (imgFile) {
      try {
        if (
          window.confirm(
            `Bạn có chắc thêm hình ảnh cho công việc này không?`
          )
        ) {
          const formData = new FormData();
          formData.append("formFile", imgFile, imgFile.name);
          const addImg = await jobService.uploadImageApi(
            currentJobId,
            formData
          );
          setImgSrcApi(addImg.data.content.hinhAnh);
          notification.success({
            message: "Thêm hình thành công",
            placement: "bottomRight",
            duration: 2,
          });
          document.getElementById("closeUploadImage").click();
        }
      } catch (error) {
        notification.warning({
          message: "Không thể thêm hình",
        });
      }
      setImgFile(null);
    } else {
      notification.warning({
        message: "Vui lòng chọn một hình ảnh trước khi upload",
      });
    }
  };
  //hàm này reset thông tin hình ảnh trong form upload hình
  const resetImageState = () => {
    setImgSrc(null);
    setImgSrcApi(null);
    setImgFile(null);
  };
  const handleImageButtonClick = (jobId) => {
    setCurrentJobId(jobId);
    resetImageState(); 
  };
  //hàm phân trang 10 job 1 page
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const indexOfLastUser = currentPage * jobsPerPage;
  const indexOfFirstUser = indexOfLastUser - jobsPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobList.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }
  const currentUsers = jobList.slice(indexOfFirstUser, indexOfLastUser);
  //hàm rendercontent
  const renderContent = () => {
    return currentUsers.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.id}</td>
          <td>{element.tenCongViec}</td>
          <td>
            <img
              style={{ height: "150px", width: "auto", objectFit: "contain" }}
              className="card-img-top"
              src={element.hinhAnh}
              alt="job"
            />{" "}
          </td>
          <td>{element.moTaNgan}</td>
          <td>{element.giaTien}</td>
          <td>{element.danhGia}</td>
          <td>
            <button
              className="btn btn-info mr-2 "
              data-toggle="modal"
              data-target="#myModal2"
              onClick={() => {
                handleEditClick(element.id);
              }}
            >
              EDIT
            </button>
            <button
              onClick={async () => {
                if (
                  window.confirm(
                    `Bạn có chắc muốn xóa công việc ${element.tenCongViec} không?`
                  )
                ) {
                  const result = await dispatch(deleteJobAction(element));
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
            <button
              className="btn btn-warning"
              data-toggle="modal"
              data-target="#myModalUploadImage"
              onClick={() => handleImageButtonClick(element.id)}
            >
              IMAGE
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
        QUẢN LÝ CÔNG VIỆC
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
            Danh Sách Công Việc
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
                <i className="fa fa-plus mr-1" /> ADD NEW JOB
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
                  <th>Name</th>
                  <th>Image</th>
                  <th>Discription</th>
                  <th>$Price</th>
                  <th>Rate</th>
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
                  currentPage === Math.ceil(jobList.length / jobsPerPage) ||
                  jobList.length <= jobsPerPage
                    ? "page-item disabled"
                    : "page-item"
                }
                onClick={() => {
                  if (currentPage !== Math.ceil(jobList.length / jobsPerPage)) {
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
                ADD NEW JOB
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeAddJob"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Name Job */}
                <div className="form-group ">
                  <label className="font-weight-bold">Name Job *</label>
                  <input
                    onChange={handleChange}
                    name="tenCongViec"
                    className="form-control"
                    id="nameJobInput"
                  />
                  <span ref={nameJobRef} className="text-danger"></span>
                </div>
                {/* Discription */}
                <div className="form-group">
                  <label className="font-weight-bold">Discription *</label>
                  <input
                    onChange={handleChange}
                    name="moTa"
                    className="form-control"
                    id="discriptionJobInput"
                  />
                  <span ref={discriptionJobRef} className="text-danger"></span>
                </div>
                {/* Short Discription */}
                <div className="form-group">
                  <label className="font-weight-bold">
                    Short Discription *
                  </label>
                  <input
                    onChange={handleChange}
                    name="moTaNgan"
                    className="form-control"
                    id="shortDiscriptionJobInput"
                  />
                  <span
                    ref={shortDiscriptionJobRef}
                    className="text-danger"
                  ></span>
                </div>
                {/* Price*/}
                <div className="form-group">
                  <label className="font-weight-bold">Price *</label>
                  <input
                    onChange={handleChange}
                    name="giaTien"
                    className="form-control"
                    placeholder="number"
                    id="priceJobInput"
                  />
                  <span ref={priceJobRef} className="text-danger"></span>
                </div>
                {/* Rate*/}
                <div className="form-group">
                  <label className="font-weight-bold">Rate</label>
                  <input
                    onChange={handleChange}
                    name="danhGia"
                    className="form-control"
                    placeholder="number"
                    id="rateJobInput"
                  />
                  <span ref={rateJobRef} className="text-danger"></span>
                </div>
                {/* Detail code*/}
                <div className="form-group">
                  <label className="font-weight-bold">Detail code</label>
                  <input
                    onChange={handleChange}
                    name="maChiTietLoaiCongViec"
                    className="form-control"
                    id="detailCodeJobInput"
                    placeholder="number"
                  />
                  <span ref={detailCodeJobRef} className="text-danger"></span>
                </div>
                {/* Star Ratting*/}
                <div className="form-group">
                  <label className="font-weight-bold">Star Ratting</label>
                  <input
                    onChange={handleChange}
                    name="saoCongViec"
                    className="form-control"
                    placeholder="number 1->5"
                    id="starRattingJobInput"
                  />
                  <span ref={starRattingJobRef} className="text-danger"></span>
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
                UPDATE JOB
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeUpdateJob"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmitUpdateJob}>
                {/* Name Job */}
                <div className="form-group ">
                  <label className="font-weight-bold">Name Job *</label>
                  <input
                    onChange={handleChangeUpdateJob}
                    value={updateJob.tenCongViec}
                    name="tenCongViec"
                    className="form-control"
                    id="updateNameJobInput"
                  />
                  <span ref={updateNameRef} className="text-danger"></span>
                </div>
                {/* Discription */}
                <div className="form-group">
                  <label className="font-weight-bold">Discription *</label>
                  <input
                    onChange={handleChangeUpdateJob}
                    value={updateJob.moTa}
                    name="moTa"
                    className="form-control"
                    id="updateDiscriptionJobInput"
                  />
                  <span
                    ref={updateDiscriptionRef}
                    className="text-danger"
                  ></span>
                </div>
                {/* Short Discription */}
                <div className="form-group">
                  <label className="font-weight-bold">
                    Short Discription *
                  </label>
                  <input
                    onChange={handleChangeUpdateJob}
                    value={updateJob.moTaNgan}
                    name="moTaNgan"
                    className="form-control"
                    id="updateShortDiscriptionJobInput"
                  />
                  <span
                    ref={updateShortDiscriptionRef}
                    className="text-danger"
                  ></span>
                </div>
                {/* Price*/}
                <div className="form-group">
                  <label className="font-weight-bold">Price *</label>
                  <input
                    onChange={handleChangeUpdateJob}
                    value={updateJob.giaTien}
                    name="giaTien"
                    className="form-control"
                    placeholder="number"
                    id="updatePriceJobInput"
                  />
                  <span ref={updatePriceRef} className="text-danger"></span>
                </div>
                {/* Rate*/}
                <div className="form-group">
                  <label className="font-weight-bold">Rate</label>
                  <input
                    onChange={handleChangeUpdateJob}
                    value={updateJob.danhGia}
                    name="danhGia"
                    className="form-control"
                    placeholder="number"
                    id="updateRateJobInput"
                  />
                  <span ref={updateRateRef} className="text-danger"></span>
                </div>
                {/* Detail Code*/}
                <div className="form-group">
                  <label className="font-weight-bold">Detail Code</label>
                  <input
                    onChange={handleChangeUpdateJob}
                    value={updateJob.maChiTietLoaiCongViec}
                    name="maChiTietLoaiCongViec"
                    className="form-control"
                    id="updateDetailCodeJobInput"
                  />
                  <span
                    ref={updateDetailCodeRef}
                    className="text-danger"
                  ></span>
                </div>
                {/* Star Ratting*/}
                <div className="form-group">
                  <label className="font-weight-bold">Star Ratting</label>
                  <input
                    onChange={handleChangeUpdateJob}
                    value={updateJob.saoCongViec}
                    name="saoCongViec"
                    className="form-control"
                    placeholder="number 1->5"
                    id="updateStarRattingJobInput"
                  />
                  <span
                    ref={updateStarRattingRef}
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

      {/**The Modal UPLOAD IMAGE */}
      <div className="modal fade" id="myModalUploadImage">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title font-weight-bold text-danger">
                UPLOAD IMAGE
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                id="closeUploadImage"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              {/* Upload Image */}
              <div className="form-group">
                <input
                  type="file"
                  name="image"
                  className="form-control-file"
                  onChange={handleChangeFile}
                />
              </div>
              <div className="text-right">
                <button className="btn btn-success" onClick={AddImg}>
                  Upload
                </button>
              </div>
            </div>
            {/* Modal footer */}
            <div className="modal-footer" id="cancel" />
          </div>
        </div>
      </div>
    </div>
  );
}
