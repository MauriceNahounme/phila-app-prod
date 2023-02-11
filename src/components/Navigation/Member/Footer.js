import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <div className="col-12">
      <Navbar bg="dark" variant="dark" className="footer">
        <Container>
          <Navbar.Brand>
            <img src="./img/BLEU-LOGO-TAILLE.png" alt="Phila" width="200px" />
          </Navbar.Brand>
          <Nav className="me-auto footer-nav">
            <Nav.Link>Copyright 2023 | Phila, cité des adorateurs</Nav.Link>
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Footer;
