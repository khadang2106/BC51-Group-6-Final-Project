//đây là hook gọi danh sách công việc
import { useEffect, useState } from 'react'
import { jobService } from '../services/job';

export default function useJobList() {
    const [jobList,setJobList] = useState([]);
    const fetchJobList = async () => {
        const result = await jobService.fetchJobList()
        setJobList(result.data.content);
    }
    useEffect(()=>{
        fetchJobList();
    },[])
  return jobList;
}
