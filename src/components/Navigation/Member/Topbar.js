import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Avatar, Badge } from "antd";
import FormModal from "../../Servent/Member/FormModal";

const Topbar = () => {
  const member = useSelector((state) => state.memberReducer);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="col-12">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img src="./img/LOGO-PHILA.png" alt="Logo phila" width="80px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Prendre RDV</Nav.Link>

              <NavDropdown title="Espace média" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">Galerie Photos</NavDropdown.Item>
                <NavDropdown.Item href="#">Podcast</NavDropdown.Item>
                <NavDropdown.Item href="/video">Vidéo</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/donate">Faire un don</Nav.Link>

              <NavDropdown title="Programmes" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">Jeudi ETOKO</NavDropdown.Item>
                <NavDropdown.Item href="#a">24 soirées</NavDropdown.Item>
                <NavDropdown.Item href="#">Prière matinale</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Église Phila" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">Qui sommes-nous ?</NavDropdown.Item>
                <NavDropdown.Item href="" onClick={showModal}>
                  Je suis serviteur
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Nav.Link href="#">
                <span
                  className="avatar-item"
                  style={{
                    marginRight: "10px",
                    position: "relative",
                    bottom: "4px",
                  }}
                >
                  <Badge>
                    <Avatar
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                        marginRight: "10px",
                      }}
                      size={50}
                    >
                      {member?.member?.first_name.slice(0, 1) +
                        member?.member?.last_name.slice(0, 1)}
                    </Avatar>
                  </Badge>
                </span>
                {member?.member?.first_name + " " + member?.member?.last_name}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FormModal
        open={open}
        handleCancel={handleCancel}
        handleOk={handleOk}
        loading={loading}
      />
    </div>
  );
};

export default Topbar;
