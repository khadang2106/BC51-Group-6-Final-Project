//đây là hook gọi danh sách công việc đã thuê
import { useEffect, useState } from 'react'
import { serviceService } from '../services/service';

export default function useServiceList() {
    const [serviceList,setServiceList] = useState([]);
    const fetchServiceList = async () => {
        const result = await serviceService.fetchServiceList();
        setServiceList(result.data.content);
    }
    useEffect(()=>{
        fetchServiceList();
    },[])
  return serviceList;
}
