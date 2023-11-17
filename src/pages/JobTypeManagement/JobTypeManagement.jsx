import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserAction } from "../../store/actions/userAction";
import useJobTypeList from "../../hooks/useJobTypeList";

export default function UserManagement() {
  const jobTypeList = useJobTypeList();
  console.log(jobTypeList);
  const dispatch = useDispatch();
  //hàm rendercontent
  const renderContent = () => {
    return jobTypeList.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.id}</td>
          <td>{element.tenLoaiCongViec}</td>
          <td>
            <button
              className="btn btn-info mr-2 "
              data-toggle="modal"
              data-target="#myModal2"
            >
              VIEW & EDIT
            </button>
            <button
              onClick={async () => {
                if (
                  window.confirm(
                    `Bạn có chắc muốn xóa người dùng ${element.name} không?`
                  )
                ) {
                  const result = await dispatch(deleteUserAction(element));
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
                id="close"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form>
                {/* ID */}
                <div className="form-group ">
                  <label className="font-weight-bold">ID</label>
                  <input
                    name="id"
                    className="form-control"
                  />
                </div>
                {/* Job Type */}
                <div className="form-group">
                  <label className="font-weight-bold">Job Type</label>
                  <input
                    name="jobType"
                    className="form-control"
                  />
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
                id="close"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form>
                {/* ID */}
                <div className="form-group ">
                  <label className="font-weight-bold">ID</label>
                  <input
                    name="id"
                    className="form-control"
                  />
                </div>
                {/* Job Type */}
                <div className="form-group">
                  <label className="font-weight-bold">Job Type</label>
                  <input
                    name="jobType"
                    className="form-control"
                  />
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
