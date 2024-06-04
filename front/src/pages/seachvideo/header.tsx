import { Link, Outlet, useNavigate } from "react-router-dom"

import React, { FormEvent, useRef, } from 'react';
import { MDBInput, MDBIcon, MDBBtn, } from 'mdb-react-ui-kit';

export default function VideoListHeader() {
    const searchRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const submithandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchValue = searchRef.current?.value;
        if (searchValue && /^[^\\~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(searchValue)) {
            navigate(`/seachlist/${searchValue}`);
        } 
        else {
            alert("특수문자가 포함되어있습니다.");
        }
    }
    
    
    return (
        <div>
         
            <div style={{ display: "flex", justifyContent: "center", marginLeft: "20%", marginRight:"20%", padding: "0px" }}>
                <form onSubmit={submithandler} className="flex md:gap-8 md:p-6 justify-center" style={{ width: "100%", margin: "0px auto" }}>
                    <MDBInput label='Search' ref={searchRef} />
                    <MDBBtn rippleColor='dark'>
                        <MDBIcon style={{ borderRadius: "50%" }} icon='search' />
                    </MDBBtn>
                </form>
            </div>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    )
}


