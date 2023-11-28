import { Outlet, Link } from "react-router-dom";
import '../App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useState } from "react";
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
crossorigin="anonymous"></link>

const Layout = ({cards, setCards}) => {
  return (
    <>
       <Navbarry></Navbarry>

      <Outlet />

    </>
  )
};

const Navbarry = () => {
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" className=" .text-white">Navbar</Navbar.Brand>
          <Nav className="ml-auto .text-white">
            <Nav.Link href="/Create">Create</Nav.Link>
            <Nav.Link href="/Review">Review</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default Layout;