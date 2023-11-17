import React from "react";
import useUserList from "../../hooks/userList";
import { useDispatch } from "react-redux";
import { deleteUserAction } from "../../store/actions/userAction";

export default function UserManagement() {
  const userList = useUserList();
  const dispatch = useDispatch();
  const renderContent = () => {
    return userList.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.id}</td>
          <td>{element.name}</td>
          <td>{element.role}</td>
          <td>{element.certification}</td>
          <td>{element.skill}</td>
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
        QUẢN LÝ NGƯỜI DÙNG
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
            Danh Sách Người Dùng
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
                <i className="fa fa-plus mr-1" /> ADD NEW ADMIN
              </button>
              {/* END BUTTON THÊM MỚI */}
            </div>
            {/* INPUT SEARCH */}
            <div className="col-12 form-group has-search mt-16">
              <div className="form-group mb-0">
                <div className="row">
                  <div className="col-9">
                    <input
                      type="text"
                      placeholder="Nhập tên người dùng để tìm kiếm........"
                      className="form-control"
                    />
                  </div>
                  <div className="col-1">
                    <button className="btn btn-danger">Tìm</button>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
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
                  <th>Role</th>
                  <th>Certification</th>
                  <th>Skill</th>
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
                ADD NEW ADMIN
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
                {/* email */}
                <div className="form-group ">
                  <label className="font-weight-bold">Email</label>
                  <input
                    name="email"
                    className="form-control"
                    placeholder="Nhập email..."
                  />
                </div>
                {/* name */}
                <div className="form-group">
                  <label className="font-weight-bold">Name</label>
                  <input
                    name="name"
                    className="form-control"
                    placeholder="Nhập tên người dùng..."
                  />
                </div>
                {/* password */}
                <div className="form-group">
                  <label className="font-weight-bold">Password</label>
                  <input
                    name="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu..."
                  />
                </div>
                {/* phone*/}
                <div className="form-group">
                  <label className="font-weight-bold">Phone</label>
                  <input
                    name="phone"
                    className="form-control"
                    placeholder="Nhập số điện thoại..."
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
                UPDATE USER
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
                {/* email */}
                <div className="form-group ">
                  <label className="font-weight-bold">Email</label>
                  <input
                    name="email"
                    className="form-control"
                    placeholder="Nhập email..."
                  />
                </div>
                {/* name */}
                <div className="form-group">
                  <label className="font-weight-bold">Name</label>
                  <input
                    name="name"
                    className="form-control"
                    placeholder="Nhập tên người dùng..."
                  />
                </div>
                {/* phone */}
                <div className="form-group">
                  <label className="font-weight-bold">Phone</label>
                  <input
                    name="phone"
                    className="form-control"
                    placeholder="Nhập số điện thoại..."
                  />
                </div>
                {/* birthday*/}
                <div className="form-group">
                  <label className="font-weight-bold">Birthday</label>
                  <input
                    name="birthday"
                    className="form-control"
                    placeholder="Nhập ngày-tháng-năm sinh..."
                  />
                </div>
                {/* role*/}
                <div className="form-group">
                  <label className="font-weight-bold">Role</label>
                  <input
                    name="role"
                    className="form-control"
                    placeholder="Nhập loại người dùng..."
                  />
                </div>
                {/* Certification*/}
                <div className="form-group">
                  <label className="font-weight-bold">Certification</label>
                  <input
                    name="certification"
                    className="form-control"
                    placeholder="Nhập các chứng nhận..."
                  />
                </div>
                {/* Skill*/}
                <div className="form-group">
                  <label className="font-weight-bold">Skill</label>
                  <input
                    name="skill"
                    className="form-control"
                    placeholder="Nhập các kỹ năng..."
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
