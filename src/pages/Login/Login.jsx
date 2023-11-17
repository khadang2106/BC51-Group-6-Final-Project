import React, { useState } from 'react';
import { userService } from '../../services/user';
import { useDispatch } from 'react-redux';
import { setUserInfoAction } from '../../store/actions/userAction';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  //hàm dispatch lên store
  const dispatch = useDispatch();
  //chỗ này useState để lấy thông tin trên form đăng nhập
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(state);
    const result = await userService.loginApi(state);
    //trước khi dispatch thì lưu local để tránh trường hợp khi f5 lại thì data store mất hết
    //chỗ lưu thì lưu file ở dạng chuỗi stringify
    localStorage.setItem('USER_INFO', JSON.stringify(result.data.content));
    dispatch(setUserInfoAction(result.data.content));

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
    //sau khi login thành công thì chuyển về trang home
    navigate('/');
  };
  return (
    <div className="w-25 mx-auto py-5 text-white">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">LOGIN</button>
      </form>
    </div>
  );
}