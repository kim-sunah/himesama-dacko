import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SlArrowLeftCircle } from "react-icons/sl";
import { SlArrowRightCircle } from "react-icons/sl";



export default function YoutubeBasicPagenation(props: { nextPageToken?: string, prevPageToken?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [page, setPage] = useState(1);

  const handleChange = (value : number) => {
    setPage(value);
    const queryParams = new URLSearchParams(location.search);

    if (value > page && props.nextPageToken) {
      queryParams.set('PageToken', props.nextPageToken);
    } else if (value < page && props.prevPageToken) {
      queryParams.set('PageToken', props.prevPageToken);
    }

    navigate(`${currentPath}?${queryParams.toString()}`);
  };

  return (
   
    <div style={{display:"flex"}}>
      {props.prevPageToken && <SlArrowLeftCircle size="60" onClick={() => handleChange(page - 1)} />}
      {props.nextPageToken && <SlArrowRightCircle size="60" onClick={() => handleChange(page + 1)}/>}
    </div>
   
  );
}
