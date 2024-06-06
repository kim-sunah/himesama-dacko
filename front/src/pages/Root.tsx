import { Outlet } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Row } from "react-bootstrap";
import { Mainheader } from "./main/header/Mainheader";


export default function Root() {
    // useEffect(()=>{
    //     axios.get('http://localhost:4000/Test', { withCredentials: true })
    //     .then(response => {
    //       console.log(response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });


    // },[])
    return (
        <div>
            <Mainheader></Mainheader>
        <main>
            <Outlet></Outlet>
        </main>
    </div>
    

    )
}