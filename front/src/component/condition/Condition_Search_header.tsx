

import InfluencerFilterDropdown from './dropdown/InfluencerFilterDropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import VideoFilterDropdown from './dropdown/VideoFilterDropdown';


export default function ConditionSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const FirstPath = currentPath.split('/')[1];
  const SecondPath = currentPath.split('/')[2];
  const [category, setcategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    if (FirstPath === "Condition_Search") {
      navigate(`/Condition_Search/${event.target.value}/1`)
      setcategory(event.target.value as string);
      return;
    }
    navigate(`/YoutubeCondition/${event.target.value}`)
    setcategory(event.target.value as string);
    return;
  };

  const searchRef = useRef<HTMLInputElement>(null);
  const submithandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    
      const searchValue = searchRef.current?.value;
      if (searchValue && /^[^\\~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(searchValue)) {
        navigate(`?search=${searchValue}`);
        
        if (searchRef.current) {
          searchRef.current.value = '';
        }
      } else {
        alert("특수문자가 포함되어있습니다.");
      }
      
    
  }


  return (
    <div style={{ display: "flex", justifyContent: "right" }}>
      {SecondPath && FirstPath !== "Condition_Search" && <form  onSubmit={submithandler} className="flex md:gap-5 md:p-20 justify-center" style={{ width: "50%" }}>
        <MDBInput label='Search' className='custom-input' ref={searchRef}/>
        <MDBBtn type ="submit" rippleColor='dark'>
          <MDBIcon style={{ borderRadius: "50%" }} icon='search' />
        </MDBBtn>
      </form>}

      <div style={{ marginTop: "3%", marginBottom: "3%" }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-simple-select-label">조건 검색 카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="조건 검색 카테고리"
            onChange={handleChange}
          >
            <MenuItem value={"InfluencerFilter"} >{FirstPath ==="Condition_Search" ? "인플루언서" : "검색 관련 채널"}</MenuItem>
            <MenuItem value={"VideoFilter"}>영상</MenuItem>

          </Select>
        </FormControl>
      </div>

      <div className="dropdown" style={{ marginTop: '3.8%', marginRight: "11%", marginLeft: "2%" }}>
        {SecondPath === "InfluencerFilter" && <InfluencerFilterDropdown title="Influencer Filter"></InfluencerFilterDropdown>}
        {/* {Influencer && <InfluencerFilterDropdown title="Influencer Filter"></InfluencerFilterDropdown>} */}
        {/* {Path === "VideoFilter" && <BsFilterLeft size="40" title="Video Filter"  onClick={() => setVideo(true)}></BsFilterLeft>} */}
         {SecondPath === "VideoFilter" && <VideoFilterDropdown title="Video Filter"></VideoFilterDropdown>} 
      </div>
    </div>
  )
}