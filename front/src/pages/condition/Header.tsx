
import { Input } from "../../component/v0/input"
import { Button } from "../../component/v0/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../component/v0/select";
import { AiOutlineSearch } from "react-icons/ai";
import "../../styles/Condition.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import * as React from 'react';
import { DialogCloseButton } from '../../component/Modal/DialogCloseButton';


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const FirstPath = currentPath.split('/')[1];
  const SecondPath = currentPath.split('/')[2];
  const SearchRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    if (FirstPath === "Condition_Search") {
      navigate(`/Condition_Search/${value}/1`);
    } else {
      navigate(`/YoutubeCondition/${value}`);
    }
  };
 
  const submithandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(!SecondPath){
        alert("검색 카테고리를 설정해주세요");
        return;
      }
      const searchValue = SearchRef.current?.value;
      if (searchValue && /^[^\\~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(searchValue)) {
        navigate(`?search=${searchValue}`);
        
        if (SearchRef.current) {
          SearchRef.current.value = '';
        }
      } else {
        alert("특수문자가 포함되어있습니다.");
      }
  }
  return (
    <header className=" py-4 px-8  md:flex-row">
      {FirstPath === "YoutubeCondition" &&      
      <form className="flex space-x-4 "    style={{display:"flex", justifyContent:"center"}} onSubmit={submithandler}>
        <Input placeholder="Search" className="w-80"  ref={SearchRef}/>
        <Button type="submit" variant="secondary" className="bg-black">
          <AiOutlineSearch size="25" color="white"/>
        </Button>
      </form>}
    
      <div className="filter flex space-x-4 mt-10 lg:mr-40 lg:w-72 lg:float-end mb-6" >
        <Select onValueChange={handleChange}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem  value="InfluencerFilter">{FirstPath ==="Condition_Search" ? "채널" : "검색 관련 채널"}</SelectItem>
            {/* <SelectItem  value="VideoFilter">영상</SelectItem> */}
          </SelectContent>
        </Select>
        {SecondPath === "InfluencerFilter"  && <DialogCloseButton></DialogCloseButton>}
      </div>
    </header>
  )
}
