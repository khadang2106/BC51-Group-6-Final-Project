import React, { useEffect, useRef, useState } from "react";
import useUserList from "../../hooks/userList";
import { useDispatch } from "react-redux";
import {
  deleteUserAction,
  updateUserAction,
} from "../../store/actions/userAction";
import { userService } from "../../services/user";
export default function UserManagement() {
  const userList = useUserList();
  const dispatch = useDispatch();
  //useState cho add new Admin
  const [addAdmin, setAddAdmin] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
  });
  //useState cho update user
  const [updateUser, setUpdateUser] = useState({
    email: "",
    name: "",
    phone: "",
    birthday: "",
    role: "",
    certification: "",
    skill: "",
  });
  //handle change và handle submit để add new admin
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddAdmin({
      ...addAdmin,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation email trong admin
    isValid &=
      validationRequired(
        addAdmin.email,
        emailRef,
        "Email không được để trống!"
      ) &&
      validationEmail(
        addAdmin.email,
        emailRef,
        "Vui lòng nhập email đúng định dạng!"
      );
    //validation name trong admin
    isValid &=
      validationRequired(
        addAdmin.name,
        nameRef,
        "Tên tài khoản không được để trống!"
      ) &&
      validationSpace(
        addAdmin.name,
        nameRef,
        "Tên tài khoản không có khoảng trắng!"
      );
    //validation password trong admin
    isValid &=
      validationRequired(
        addAdmin.password,
        passwordRef,
        "Mật khẩu không được để trống!"
      ) &&
      validationMatKhau(
        addAdmin.password,
        passwordRef,
        "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt!"
      );
    //validation phone trong admin
    isValid &=
      validationRequired(
        addAdmin.phone,
        phoneRef,
        "Số điện thoại không được để trống!"
      ) &&
      validationNumber(
        addAdmin.phone,
        phoneRef,
        "Vui lòng nhập số điện thoại bằng chữ số!"
      );
    if (isValid) {
      const dataAddAdmin = { ...addAdmin, role: "ADMIN" };
      try {
        if (
          window.confirm(
            `Bạn có chắc muốn thêm người dùng ${dataAddAdmin.name} này làm Admin không?`
          )
        ) {
          const response = await userService.addNewAdminApi(dataAddAdmin);
          if (response && response.data.statusCode === 200) {
            alert("Thêm Admin thành công!");
            document.getElementById("close1").click();
          }
        }
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        alert("Có lỗi xảy ra khi thêm người dùng. Vui lòng thử lại.");
      }
    }
  };
  //hàm này khi click vào View và Edit lấy thông tin từ API show ra form
  const handleEditClick = async (id) => {
    resetFormUpdateUser();
    try {
      const getUserDetail = await userService.getUserDetailApi(id);
      if (getUserDetail.data.statusCode === 200) {
        setUpdateUser(getUserDetail.data.content);
      } else {
        console.error("Lỗi lấy thông tin chi tiết user:", getUserDetail.data);
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin api", error);
    }
  };
  //handlechange và handlesubmit update
  const handleChangeUpdate = (event) => {
    const { name, value } = event.target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  };
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    let isValid = true;
    //validation name trong update
    isValid &=
      validationRequired(
        updateUser.name,
        nameUpdateRef,
        "Tên tài khoản không được để trống!"
      ) &&
      validationSpace(
        updateUser.name,
        nameUpdateRef,
        "Tên tài khoản không chứa khoảng trắng!"
      );
    //validation phone trong update
    isValid &=
      validationRequired(
        updateUser.phone,
        phoneUpdateRef,
        "Số điện thoại không được để trống!"
      ) &&
      validationNumber(
        updateUser.phone,
        phoneUpdateRef,
        "Vui lòng nhập số điện thoại bằng chữ số!"
      );
    //validation birthday trong update
    isValid &=
      validationRequired(
        updateUser.birthday,
        birthdayRef,
        "Ngày tháng năm sinh không được để trống!"
      ) &&
      validationDate(
        updateUser.birthday,
        birthdayRef,
        "Vui lòng nhập đúng định dạng ngày/tháng/năm!"
      );
    //validation role trong update
    isValid &=
      validationRequired(
        updateUser.role,
        roleRef,
        "Loại người dùng không được để trống!"
      ) &&
      validationRole(
        updateUser.role,
        roleRef,
        "Loại người dùng chỉ có ADMIN HOẶC USER! (viết hoa)"
      );
    if (isValid) {
      try {
        //chuyển certification và skill từ chuỗi sang mảng theo yc của api
        const certifications = Array.isArray(updateUser.certification)
          ? updateUser.certification
          : typeof updateUser.certification === "string"
          ? updateUser.certification.split(",").map((cert) => cert.trim())
          : [];
        const skills = Array.isArray(updateUser.skill)
          ? updateUser.skill
          : typeof updateUser.skill === "string"
          ? updateUser.skill.split(",").map((skill) => skill.trim())
          : [];
        if (
          window.confirm(
            `Bạn có chắc muốn cập nhật người dùng ${updateUser.name} này không?`
          )
        ) {
          await dispatch(
            updateUserAction({
              ...updateUser,
              certification: certifications,
              skill: skills,
            })
          );
        }
      } catch (error) {
        console.error("Lỗi khi thêm người dùng:", error);
        alert("Có lỗi xảy ra khi thêm người dùng. Vui lòng thử lại.");
      }
    }
  };
  //search user
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const handleSearch = async () => {
    setHasSearched(true);
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const result = await userService.searchUserApi(searchValue);
      if (result.data.statusCode === 200) {
        setSearchResults(result.data.content);
      } else {
        console.error("Có lỗi khi lấy kết quả search:", result.data);
      }
    } catch (error) {
      console.error("Có lỗi khi call api search", error);
    }
  };
  //hiển thị giá trị khi search
  const [displayedUsers, setDisplayedUsers] = useState(userList);
  useEffect(() => {
    if (hasSearched) {
      setDisplayedUsers(searchResults);
    } else {
      setDisplayedUsers(userList);
    }
  }, [hasSearched, searchResults, userList]);
  //hàm xem tất cả sau khi search
  const handleShowAll = () => {
    setSearchResults([]);
    setHasSearched(false);
    setSearchValue("");
  };
  //hàm reset data form và reset error addadmin
  const resetModalState = () => {
    setAddAdmin({
      email: "",
      name: "",
      password: "",
      phone: "",
    });
    document.getElementById("emailInput").value = "";
    document.getElementById("nameInput").value = "";
    document.getElementById("passwordInput").value = "";
    document.getElementById("phoneInput").value = "";
    emailRef.current.innerHTML = "";
    nameRef.current.innerHTML = "";
    passwordRef.current.innerHTML = "";
    phoneRef.current.innerHTML = "";
  };
  //hàm reset dataform và reset error update user
  const resetFormUpdateUser = () => {
    setUpdateUser({
      email: "",
      name: "",
      phone: "",
      birthday: "",
      role: "",
      certification: "",
      skill: "",
    });
    document.getElementById("nameUpdate").value = "";
    document.getElementById("phoneUpdate").value = "";
    document.getElementById("birthdayUpdate").value = "";
    document.getElementById("roleUpdate").value = "";
    document.getElementById("certificationUpdate").value = "";
    document.getElementById("skillUpdate").value = "";
    nameUpdateRef.current.innerHTML = "";
    phoneUpdateRef.current.innerHTML = "";
    birthdayRef.current.innerHTML = "";
    roleRef.current.innerHTML = "";
    certificationRef.current.innerHTML = "";
    skillRef.current.innerHTML = "";
  };
  //hàm này validation check rỗng
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const nameUpdateRef = useRef(null);
  const phoneUpdateRef = useRef(null);
  const birthdayRef = useRef(null);
  const roleRef = useRef(null);
  const certificationRef = useRef(null);
  const skillRef = useRef(null);
  const validationRequired = (value, ref, message) => {
    if (value) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm check validation email
  const validationEmail = (value, ref, message) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //validation password
  const validationMatKhau = (value, ref, message) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (regex.test(value)) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm check validation số điện thoại
  const validationNumber = (value, ref, message) => {
    if (/^[0-9]+$/.test(value)) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm check validation name không khoảng trắng
  const validationSpace = (value, ref, message) => {
    if (!/\s/.test(value)) {
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
  // hàm check validation role
  const validationRole = (value, ref, message) => {
    const validRoles = ["ADMIN", "USER"];
    if (validRoles.includes(value)) {
      ref.current.innerHTML = "";
      return true;
    }
    ref.current.innerHTML = message;
    return false;
  };
  //hàm phân trang 10 user 1 page
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(displayedUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const currentUsers = displayedUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  //hàm render data
  const renderContent = () => {
    const displayList = hasSearched ? searchResults : currentUsers;
    if (searchResults.length === 0 && hasSearched) {
      return (
        <tr>
          <td colSpan="8" style={{ textAlign: "center" }}>
            Không tìm thấy người dùng!
          </td>
        </tr>
      );
    }
    return displayList.map((element, index) => {
      //chỗ này cần fomat lại chuỗi JSON do api trả về nếu không thì nó sẽ hiển thị 2 cột certification và skill dạng "[]"
      const formattedCertification = Array.isArray(element.certification)
        ? element.certification.join(", ")
        : Array.isArray(JSON.parse(element.certification))
        ? JSON.parse(element.certification).join(", ")
        : "";

      const formattedSkill = Array.isArray(element.skill)
        ? element.skill.join(", ")
        : Array.isArray(JSON.parse(element.skill))
        ? JSON.parse(element.skill).join(", ")
        : "";
      return (
        <tr key={index}>
          <td>{element.id}</td>
          <td>{element.name}</td>
          <td>{element.role}</td>
          <td>{formattedCertification}</td>
          <td>{formattedSkill}</td>
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
                onClick={resetModalState}
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
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                  <div className="col-1">
                    <button className="btn btn-danger" onClick={handleSearch}>
                      Tìm
                    </button>
                  </div>
                  <div className="col-2">
                    {hasSearched && (
                      <button
                        className="btn btn-primary"
                        onClick={handleShowAll}
                      >
                        Xem tất cả
                      </button>
                    )}
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
            {!hasSearched && (
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
                      Math.ceil(displayedUsers.length / usersPerPage) ||
                    displayedUsers.length <= usersPerPage
                      ? "page-item disabled"
                      : "page-item"
                  }
                  onClick={() => {
                    if (
                      currentPage !==
                      Math.ceil(displayedUsers.length / usersPerPage)
                    ) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                >
                  <span className="page-link">Next</span>
                </li>
              </ul>
            )}
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
                className="close1"
                data-dismiss="modal"
                id="close1"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* email */}
                <div className="form-group ">
                  <label className="font-weight-bold">Email</label>
                  <input
                    onChange={handleChange}
                    name="email"
                    className="form-control"
                    placeholder="Nhập email..."
                    id="emailInput"
                  />
                  <span ref={emailRef} className="text-danger"></span>
                </div>
                {/* name */}
                <div className="form-group">
                  <label className="font-weight-bold">Name</label>
                  <input
                    onChange={handleChange}
                    name="name"
                    className="form-control"
                    placeholder="Nhập tên người dùng..."
                    id="nameInput"
                  />
                  <span ref={nameRef} className="text-danger"></span>
                </div>
                {/* password */}
                <div className="form-group">
                  <label className="font-weight-bold">Password</label>
                  <input
                    onChange={handleChange}
                    name="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu..."
                    id="passwordInput"
                  />
                  <span ref={passwordRef} className="text-danger"></span>
                </div>
                {/* phone*/}
                <div className="form-group">
                  <label className="font-weight-bold">Phone</label>
                  <input
                    onChange={handleChange}
                    name="phone"
                    className="form-control"
                    placeholder="Nhập số điện thoại..."
                    id="phoneInput"
                  />
                  <span ref={phoneRef} className="text-danger"></span>
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
                className="close2"
                data-dismiss="modal"
                id="close2"
              >
                ×
              </button>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <form onSubmit={handleSubmitUpdate}>
                {/* email */}
                <div className="form-group ">
                  <label className="font-weight-bold">Email</label>
                  <input
                    onChange={handleChangeUpdate}
                    name="email"
                    className="form-control"
                    placeholder="Nhập email..."
                    value={updateUser.email}
                    disabled={true}
                  />
                </div>
                {/* name */}
                <div className="form-group">
                  <label className="font-weight-bold">Name</label>
                  <input
                    onChange={handleChangeUpdate}
                    name="name"
                    className="form-control"
                    placeholder="Nhập tên người dùng..."
                    value={updateUser.name}
                    id="nameUpdate"
                  />
                  <span ref={nameUpdateRef} className="text-danger"></span>
                </div>
                {/* phone */}
                <div className="form-group">
                  <label className="font-weight-bold">Phone</label>
                  <input
                    onChange={handleChangeUpdate}
                    name="phone"
                    className="form-control"
                    placeholder="Nhập số điện thoại..."
                    value={updateUser.phone}
                    id="phoneUpdate"
                  />
                  <span ref={phoneUpdateRef} className="text-danger"></span>
                </div>
                {/* birthday*/}
                <div className="form-group">
                  <label className="font-weight-bold">Birthday</label>
                  <input
                    onChange={handleChangeUpdate}
                    name="birthday"
                    className="form-control"
                    placeholder="Nhập ngày/tháng/năm sinh..."
                    value={updateUser.birthday}
                    id="birthdayUpdate"
                  />
                  <span ref={birthdayRef} className="text-danger"></span>
                </div>
                {/**gender */}
                <div className="form-group">
                  <label className="font-weight-bold">Gender</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      className="form-check-input"
                      checked={updateUser.gender === true}
                      onChange={() =>
                        setUpdateUser({ ...updateUser, gender: true })
                      }
                    />
                    <label htmlFor="complete" className="form-check-label">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      className="form-check-input"
                      checked={updateUser.gender === false}
                      onChange={() =>
                        setUpdateUser({ ...updateUser, gender: false })
                      }
                    />
                    <label htmlFor="incomplete" className="form-check-label">
                      Female
                    </label>
                  </div>
                </div>
                {/* role*/}
                <div className="form-group">
                  <label className="font-weight-bold">Role</label>
                  <input
                    onChange={handleChangeUpdate}
                    name="role"
                    className="form-control"
                    placeholder="Nhập loại người dùng..."
                    value={updateUser.role}
                    id="roleUpdate"
                  />
                  <span ref={roleRef} className="text-danger"></span>
                </div>
                {/* Certification*/}
                <div className="form-group">
                  <label className="font-weight-bold">Certification</label>
                  <input
                    onChange={handleChangeUpdate}
                    name="certification"
                    className="form-control"
                    placeholder="Nhập các chứng nhận..."
                    value={updateUser.certification}
                    id="certificationUpdate"
                  />
                  <span ref={certificationRef} className="text-danger"></span>
                </div>
                {/* Skill*/}
                <div className="form-group">
                  <label className="font-weight-bold">Skill</label>
                  <input
                    onChange={handleChangeUpdate}
                    name="skill"
                    className="form-control"
                    placeholder="Nhập các kỹ năng..."
                    value={updateUser.skill}
                    id="skillUpdate"
                  />
                  <span ref={skillRef} className="text-danger"></span>
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
