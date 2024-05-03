import { Link, Outlet, useNavigate } from "react-router-dom"

import React, { FormEvent, useRef, } from 'react';
import { MDBInput, MDBIcon, MDBBtn, } from 'mdb-react-ui-kit';

export default function VideoList() {
    const searchRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const submithandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchRef.current?.value) {
            navigate(`/seachlist/${searchRef.current?.value}`);
        }
        (event.target as HTMLFormElement).reset();
    }
    return (
        <div>
            <div style={{ textAlign: "center", marginTop: "2.5%" }}>
                <Link to="/"> HOME</Link>
            </div>
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


