import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "./Navbar.css";

const navbar = () => {
  return (
    <div>
      <Navbar expand="lg" id="nav">
        <Container>
          <Navbar.Brand href="#" id="brand">
            X-MEME
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default navbar;
