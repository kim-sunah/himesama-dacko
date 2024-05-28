
import InfluencerFilterDropdown from '../dropdown/InfluencerFilterDropdown';
import {  useLocation, useNavigate } from 'react-router-dom';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function YoutubeConditionHeader(){
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const Path = currentPath.split('/')[2];
    const [age, setAge] = React.useState('');
  
    const handleChange = (event: SelectChangeEvent) => {
      navigate(`/Condition_Search/${event.target.value}/1`)
      setAge(event.target.value as string);
    };
  
  
    return (
      <div style={{ display: "flex", justifyContent: "right" }}>
        <div style={{ marginTop: "3%", marginBottom: "3%" }}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-simple-select-label">조건 검색 카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="조건 검색 카테고리"
              onChange={handleChange}
            >
              <MenuItem value={"InfluencerFilter"} >인플루언서</MenuItem>
              {/* <MenuItem value={"VideoFilter"}>영상</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="dropdown"style={{ marginTop: '3.8%', marginRight: "11%", marginLeft: "2%" }}>
           {Path === "InfluencerFilter" &&  <InfluencerFilterDropdown title="Influencer Filter"></InfluencerFilterDropdown>}
       
          {/* {Influencer && <InfluencerFilterDropdown title="Influencer Filter"></InfluencerFilterDropdown>} */}
          {/* {Path === "VideoFilter" && <BsFilterLeft size="40" title="Video Filter"  onClick={() => setVideo(true)}></BsFilterLeft>} */}
          {/* {Video && <VideoFilterDropdown title="Video Filter"></VideoFilterDropdown>} */}
        </div>
      </div>
    )
}