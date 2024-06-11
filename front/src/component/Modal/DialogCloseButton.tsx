

import { Button } from "../v0/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../v0/dialog"
import { Input } from "../v0/input"
import { Label } from "../v0/label"

import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import React from "react"




export function DialogCloseButton() {
    const navigate = useNavigate();
    const location = useLocation();


    const [subscriberMin, setSubscriberMin] = useState("");
    const [subscriberMax, setSubscriberMax] = useState("");
    const [viewMin, setViewMin] = useState("");
    const [viewMax, setViewMax] = useState("");
    const [videoMin, setVideoMin] = useState("");
    const [videoMax, setVideoMax] = useState("");



    const formhandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      
        const SearchParams = new URLSearchParams(location.search);
        console.log(location.search)
        const QuerySearchInvalid = SearchParams.get("search")
        if (QuerySearchInvalid) {
            const queryParams: Record<string, string> = {};

            if (subscriberMin && subscriberMax) {
                queryParams.SubscriberMin = subscriberMin;
                queryParams.SubscriberMax = subscriberMax;
            }
            if (viewMin && viewMax) {
                queryParams.ViewMin = viewMin;
                queryParams.ViewMax = viewMax;
            }

            if (videoMin && videoMax) {
                queryParams.VideoMin = videoMin;
                queryParams.VideoMax = videoMax;
            }
            const queryString = new URLSearchParams(queryParams).toString();
            console.log(queryString)
            navigate(`${location.pathname}?search=${QuerySearchInvalid}&${queryString}`);
        }
        else {
            const queryParams: Record<string, string> = {};
            if (subscriberMin && subscriberMax) {
                queryParams.SubscriberMin = subscriberMin;
                queryParams.SubscriberMax = subscriberMax;
            }
            if (viewMin && viewMax) {
                queryParams.ViewMin = viewMin;
                queryParams.ViewMax = viewMax;
            }
            if (videoMin && videoMax) {
                queryParams.VideoMin = videoMin;
                queryParams.VideoMax = videoMax;
            }
            const queryString = new URLSearchParams(queryParams).toString();
            navigate(`${location.pathname}?${queryString}`);
        }
    };
    return (
        <Dialog >
            <DialogTrigger asChild >
                <Button className="bg-black text-white ">조건 검색</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle>조건 검색</DialogTitle>

                </DialogHeader>
                <div className="flex gap-6" style={{  display:"felx", alignItems:"center"  }}>
                    <Label htmlFor="name" className="text-right whitespace-nowrap" style={{ marginTop:"1.5rem"}}>
                        구독자
                    </Label>
                    <div className="grid w-full max-w-sm items-center gap-1.5"  >
                        <Label htmlFor="number">최소 </Label>
                        <Input type="number" id="number"  value={subscriberMin} onChange={(e) => setSubscriberMin(e.target.value)}/>
                    </div>
                    
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="number">최대 </Label>
                        <Input type="number" id="number"  value={subscriberMax} onChange={(e) => setSubscriberMax(e.target.value)}/>
                    </div>
                </div>
                <div className="flex gap-6" style={{  display:"felx", alignItems:"center"  }}>
                    <Label htmlFor="name" className="text-right whitespace-nowrap" >
                        조회수
                    </Label>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        
                        <Input type="number" id="number"   value={viewMin} onChange={(e) => setViewMin(e.target.value)}/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">

                        <Input type="number" id="number"     value={viewMax}onChange={(e) => setViewMax(e.target.value)}/>
                    </div>
                </div>
                <div className="flex gap-6" style={{  display:"felx", alignItems:"center"  }}>
                    <Label htmlFor="name" className="text-right whitespace-nowrap" >
                        동영상
                    </Label>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                       
                        <Input type="number" id="number"   value={videoMin} onChange={(e) => setVideoMin(e.target.value)}/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                       
                        <Input type="number" id="number"     value={videoMax}  onChange={(e) => setVideoMax(e.target.value)}/>
                    </div>
                </div>
             
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild className="bg-black ">
                        <Button type="button" variant="secondary" style={{ color: 'white' }}>
                            닫기
                        </Button>
                    </DialogClose>
                    <DialogClose asChild className="bg-black ">
                        <Button type="button" variant="secondary" style={{ color: 'white' }} onClick={formhandler}>
                            검색
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
