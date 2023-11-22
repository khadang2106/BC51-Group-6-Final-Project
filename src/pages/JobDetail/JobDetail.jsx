import React, { useEffect, useState } from 'react';

import './jobDetail.scss';

import JobInfo from './components/JobInfo/JobInfo';
import CheckOut from './components/CheckOut/CheckOut';
import { useParams } from 'react-router-dom';
import { jobService } from '../../services/job';

export default function JobDetail() {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [jobDetail, setJobDetail] = useState({});

  const fetchJobDetail = async () => {
    const result = await jobService.fetchJobDetailApi(params.id);

    setJobDetail(result.data.content[0]);
  };

  useEffect(() => {
    fetchJobDetail();
  }, [params.id]);

  return (
    <div className="job-detail-wrapper">
      <div className="container d-flex justify-content-between">
        <div className="col-7">
          {jobDetail.congViec ? <JobInfo jobDetail={jobDetail} /> : <></>}
        </div>
        <div className="col-5">
          {jobDetail.congViec ? <CheckOut jobDetail={jobDetail} /> : <></>}
        </div>
      </div>
    </div>
  );
}
