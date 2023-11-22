//đây là hook gọi danh sách loại công việc
import { useEffect, useState } from 'react'
import { jobTypeService } from '../services/jobType';

export default function useJobTypeList() {
    const [jobTypeList,setJobTypeList] = useState([]);
    const fetchJobTypeList = async () => {
        const result = await jobTypeService.fetchJobTypeList()
        setJobTypeList(result.data.content);
    }
    useEffect(()=>{
        fetchJobTypeList();
    },[])
  return jobTypeList;
}
