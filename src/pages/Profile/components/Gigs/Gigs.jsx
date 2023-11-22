import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hireJob } from '../../../../services/hireJob';
import Swal from 'sweetalert2';
import { Pagination } from '@mui/material';
import './gigs.scss';

export default function Gigs() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    fetchHireJobList();
  }, []);

  const fetchHireJobList = async () => {
    const result = await hireJob.fetchHireJobListApi();

    setJobList(result.data.content);
  };

  const handleDeleteHireJob = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await hireJob.deleteHireJobApi(id);

          Swal.fire({
            title: 'Deleted!',
            text: 'Your job has been deleted.',
            icon: 'success',
          });

          Swal.fire({
            title: 'Deleted!',
            text: 'Your job has been deleted.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } catch {}
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your job is still safe :)',
          icon: 'error',
        });
      }
    });
  };

  const renderJobList = () => {
    return currentCards.map((element) => {
      const { id, danhGia, giaTien, hinhAnh, tenCongViec, moTa, saoCongViec } =
        element.congViec;

      return (
        <div className="gigs__card" key={element.id}>
          <div className="gigs__info">
            <div className="gigs__info__img">
              <img className="img-fluid" src={hinhAnh} alt="" />
            </div>
            <div className="gigs__info__content">
              <h1>{tenCongViec}</h1>
              <p>{moTa}</p>
              <div className="rating">
                <div className="left">
                  <i className="fa-solid fa-star mr-1" />
                  <span className="star mr-2">{saoCongViec}</span>
                  <span className="rating-amount">({danhGia})</span>
                </div>
                <div className="right">
                  <p>${giaTien}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gigs__action-zone">
            <p>
              Job Hire Date: <span>{element.ngayThue}</span>
            </p>
            <div className="gigs__btn">
              <button
                className="btn btn-gigs btn-success mr-3"
                onClick={() => navigate(`/job-detail/${id}`)}
              >
                View Detail
              </button>
              <button
                className="btn btn-gigs btn-danger"
                onClick={() => handleDeleteHireJob(element.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(jobList.length / CARDS_PER_PAGE);

  const getCurrentPageCards = () => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    return jobList.slice(startIndex, endIndex);
  };

  const currentCards = getCurrentPageCards();

  const handleChangePage = (_, newPage) => {
    setCurrentPage(newPage);

    window.scrollTo({
      top: document.querySelector('.gigs__bottom').offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="gigs">
      <div className="gigs__top">
        <div className="gigs__card">
          <span>It seems that you don't have any active Gigs.</span>
          <button className="btn">Create a new Gig</button>
        </div>
      </div>
      <div className="gigs__bottom">{renderJobList()}</div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="standard"
        size="large"
        className="custom-pagination"
      />
    </div>
  );
}
