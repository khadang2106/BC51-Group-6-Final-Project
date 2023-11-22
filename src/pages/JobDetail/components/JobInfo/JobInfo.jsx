import React, { useContext, useEffect, useState } from 'react';
import { Breadcrumb, Rate, Collapse, Progress, Input } from 'antd';
import { Pagination } from '@mui/material';
import { commentService } from '../../../../services/comment';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import './jobInfo.scss';
import { LoadingContext } from '../../../../contexts/Loading/Loading';

const collapseText = `
  Voluptates amet earum velit nobis aliquam laboriosam nihil debitis facere voluptatibus consectetur quae quasi fuga, ad corrupti libero omnis sapiente non assumenda, incidunt officiis eaque iste minima autem.
`;
const { Search } = Input;

export default function JobInfo(props) {
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    console.log(value);
  };

  const { jobDetail } = props;

  const {
    avatar,
    tenChiTietLoai,
    tenLoaiCongViec,
    tenNguoiTao,
    tenNhomChiTietLoai,
    congViec,
  } = jobDetail;

  const [loadingState, setLoadingState] = useContext(LoadingContext);
  const userState = useSelector((state) => state.userReducer);
  const [comment, setComment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);

  const fetchCommentByJob = async () => {
    try {
      const result = await commentService.fetchCommentByJobApi(congViec?.id);

      setComment(result.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommentByJob();
  }, []);

  const elementToScrollTo = document.querySelector(
    '.review-comment .review-comment-list'
  );

  const COMMENTS_PER_PAGE = 5;
  const totalPages = Math.ceil(comment.length / COMMENTS_PER_PAGE);

  const getCurrentPage = () => {
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    return comment.slice(startIndex, endIndex);
  };

  const currentComments = getCurrentPage();

  const handleChangePage = (_, newPage) => {
    setCurrentPage(newPage);

    window.scrollTo({
      top: elementToScrollTo.offsetTop,
      behavior: 'smooth',
    });
  };

  const handleRating = (values) => {
    setRating(values);
  };

  const initialValues = {
    noiDung: '',
    maCongViec: congViec?.id,
    maNguoiBinhLuan: userState?.userInfo?.user?.id,
    ngayBinhLuan: dayjs().format('DD/MM/YYYY'),
    saoBinhLuan: rating,
  };

  const handleCommentSubmit = async (values, { resetForm }) => {
    const data = { ...values, saoBinhLuan: rating };

    await commentService
      .leaveCommentApi(data)
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });

    fetchCommentByJob();
    resetForm();
    setRating(0);
  };

  const renderComment = () => {
    return currentComments.map((element) => {
      const { avatar, id, noiDung, saoBinhLuan, tenNguoiBinhLuan } = element;

      return (
        <li className="row py-4" key={id}>
          <div className="reviewer-avatar col-2">
            <img
              src={
                avatar
                  ? avatar
                  : 'https://static.thenounproject.com/png/363639-200.png'
              }
              alt=""
              className="rounded-circle"
            />
          </div>
          <div className="comment-box col-10">
            <div className="reviewer-name">{tenNguoiBinhLuan}</div>
            <div className="reviewer-rating">
              <Rate allowHalf disabled defaultValue={saoBinhLuan} />
            </div>
            <div className="country">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
                alt=""
                className="country-flag"
              />
              <span>Vietnam</span>
            </div>
            <div className="comment-text">
              <p>{noiDung}</p>
            </div>
            <div className="reviewer-action">
              <span>Helpful?</span>
              <div className="helpful-btn">
                <div className="yes thumb-btn">
                  <i className="fa-regular fa-thumbs-up" />
                  <span>Yes</span>
                </div>
                <div className="no thumb-btn">
                  <i className="fa-regular fa-thumbs-down" />
                  <span>No</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <div className="breadcrumb">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: tenLoaiCongViec,
              href: '#',
            },
            {
              title: tenNhomChiTietLoai,
              href: '#',
            },
            {
              title: tenChiTietLoai,
              href: '#',
            },
          ]}
        />
      </div>
      <div className="job-detail__info">
        <h1 className="job-title">{congViec?.tenCongViec}</h1>
        <div
          className="seller-overview d-flex flex-wrap align-items-center"
          style={{ gap: '1rem' }}
        >
          <div className="seller-avatar">
            <img
              className="rounded-circle"
              width={70}
              src={avatar}
              alt="avatar"
            />
          </div>
          <div className="overview-content">
            <div className="top d-flex">
              <div className="seller-name">{tenNguoiTao}</div>
              <div className="seller-level">
                Level {congViec?.saoCongViec} seller
              </div>
            </div>
            <div className="bottom d-flex">
              <div className="seller-rating d-flex align-items-center">
                <div className="star">
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={congViec?.saoCongViec}
                  />
                </div>
                <div className="star-score">{congViec?.saoCongViec}</div>
                <div className="rating">({congViec?.danhGia})</div>
              </div>
              <div className="seller-ordered">
                {congViec?.saoCongViec} Order in Queue
              </div>
            </div>
          </div>
        </div>
        <div className="job-img mt-3">
          <img className="img-fluid w-100" src={congViec?.hinhAnh} alt="" />
        </div>
        <div className="job-desc mt-5">
          <h2 className="title-h2">About this gig</h2>
          <p>{congViec?.moTa}</p>
        </div>
        <div className="seller-info mt-5">
          <h2 className="title-h2">About The Seller</h2>
          <div className="seller-profile d-flex" style={{ gap: '1rem' }}>
            <div className="profile-img">
              <img className="w-100 rounded-circle" src={avatar} alt="" />
            </div>
            <div className="profile-content">
              <h3>{tenNguoiTao}</h3>
              <p>{tenChiTietLoai}</p>
              <div className="seller-rating d-flex align-items-center">
                <div className="star">
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={congViec?.saoCongViec}
                  />
                </div>
                <div className="star-score">{congViec?.saoCongViec}</div>
                <div className="rating">({congViec?.danhGia})</div>
              </div>
              <button>Contact me</button>
            </div>
          </div>
        </div>
        <div className="FAQ mt-5">
          <h2 className="title-h2">FAQ</h2>
          <Collapse
            expandIconPosition="end"
            ghost
            items={[
              {
                key: '1',
                label: <h3>Do you provide regular updates on order?</h3>,
                children: <p>{collapseText}</p>,
              },
              {
                key: '2',
                label: (
                  <h3>How do you guarantee product quality and reliability</h3>
                ),
                children: <p>{collapseText}</p>,
              },
              {
                key: '3',
                label: <h3>Do you give post-development support?</h3>,
                children: <p>{collapseText}</p>,
              },
              {
                key: '4',
                label: <h3>Do you convert PSD to HTML?</h3>,
                children: <p>{collapseText}</p>,
              },
            ]}
          />
        </div>
        <div className="review-section mt-4">
          <h2 className="title-h2">Reviews</h2>
          <div className="review-overview d-flex justify-content-between align-items-center">
            <h3>{congViec?.danhGia} reviews for this Gig</h3>
            <div className="star d-flex align-items-center">
              <Rate allowHalf disabled defaultValue={congViec?.saoCongViec} />
              <p className="star-score">{congViec?.saoCongViec}</p>
            </div>
          </div>
          <div className="review-rating mt-3 row">
            <div className="col-md-6 col-sm-12">
              <div className="rating-detail">
                <table>
                  <tbody className="">
                    <tr>
                      <td>
                        <Rate allowHalf disabled defaultValue={5} />
                      </td>
                      <td className="rating-progress-bar text-center">
                        <Progress
                          style={{ width: 130 }}
                          percent={95}
                          showInfo={false}
                          size={'small'}
                        />
                      </td>
                      <td className="star-number">({congViec?.danhGia - 1})</td>
                    </tr>
                    <tr>
                      <td>
                        <Rate allowHalf disabled defaultValue={4} />
                      </td>
                      <td className="rating-progress-bar text-center">
                        <Progress
                          style={{ width: 130 }}
                          percent={0}
                          showInfo={false}
                          size={'small'}
                        />
                      </td>
                      <td className="star-number">(0)</td>
                    </tr>
                    <tr>
                      <td>
                        <Rate allowHalf disabled defaultValue={3} />
                      </td>
                      <td className="rating-progress-bar text-center">
                        <Progress
                          style={{ width: 130 }}
                          percent={5}
                          showInfo={false}
                          size={'small'}
                        />
                      </td>
                      <td className="star-number">(1)</td>
                    </tr>
                    <tr>
                      <td>
                        <Rate allowHalf disabled defaultValue={2} />
                      </td>
                      <td className="rating-progress-bar text-center">
                        <Progress
                          style={{ width: 130 }}
                          percent={0}
                          showInfo={false}
                          size={'small'}
                        />
                      </td>
                      <td className="star-number">(0)</td>
                    </tr>
                    <tr>
                      <td>
                        <Rate allowHalf disabled defaultValue={1} />
                      </td>
                      <td className="rating-progress-bar text-center">
                        <Progress
                          style={{ width: 130 }}
                          percent={0}
                          showInfo={false}
                          size={'small'}
                        />
                      </td>
                      <td className="star-number">(0)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="rating-breakdown">
                <h5>Rating Breakdown</h5>
                <ul>
                  <li className="d-flex justify-content-between pb-2">
                    <p>Seller communication level</p>
                    <div className="d-flex">
                      <span className="star">
                        <i className="fa-solid fa-star" />
                      </span>
                      <span className="star-score">3</span>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <p>Recommend to a friend</p>
                    <div className="d-flex">
                      <span className="star">
                        <i className="fa-solid fa-star" />
                      </span>
                      <span className="star-score">3</span>
                    </div>
                  </li>
                  <li className="d-flex justify-content-between pb-2">
                    <p>Service as described</p>
                    <div className="d-flex">
                      <span className="star">
                        <i className="fa-solid fa-star" />
                      </span>
                      <span className="star-score">3</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="filter-zone mt-5">
            <h2 className="title-h2">Filters</h2>
            <div className="d-flex justify-content-between align-items-center">
              <div className="search-box">
                <Search
                  placeholder="Search reviews"
                  onSearch={onSearch}
                  enterButton
                />
              </div>
              <div className="sort-by d-flex align-items-center">
                <span>Sort By</span>
                <select name="" id="">
                  <option value="recent">Most Recent</option>
                  <option value="relevant">Most Relevant</option>
                </select>
              </div>
            </div>
          </div>
          <div className="review-comment">
            <ul className="review-comment-list">{renderComment()}</ul>
          </div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            color="standard"
            size="large"
            className="custom-pagination mt-2"
          />
          <div className="add-comment py-4">
            <div className="top mb-4 d-flex align-items-center justify-content-between">
              <h2 className="title-h2">Leave comments</h2>
              <div className="rating-comment d-flex align-items-center">
                <Rate defaultValue={rating} onChange={handleRating} />
                <h2 className="title-h2">Rating</h2>
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                noiDung: Yup.string().required('(*) Comment cannot be blank'),
              })}
              onSubmit={handleCommentSubmit}
            >
              <Form className="bottom">
                <Field
                  as="textarea"
                  rows="5"
                  id="comment"
                  name="noiDung"
                  className="form-control"
                  placeholder="Leave comment here"
                />
                <ErrorMessage
                  name="noiDung"
                  component="div"
                  className="text-danger"
                />
                <button type="submit" className="comment-btn">
                  Comment
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
