import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../../config";

const Topbar = () => {
  const admin = useSelector((state) => state.userReducer);
  const [members, setMembers] = useState();

  const getMembers = () => {
    axios
      .get(`${BASE_URL}/members/`)
      .then((value) => {
        setMembers(value.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="topbar container-fluid col-16">
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/admin">
            <img src="./img/LOGO-PHILA.png" alt="Logo phila" width="80px" />
          </Navbar.Brand>
          <Nav style={{ padding: "8px" }}>
            <Nav.Link href="#home">
              <span
                className="avatar-item"
                style={{
                  marginRight: "10px",
                  position: "relative",
                  bottom: "4px",
                }}
              >
                <Badge count={members?.length}>
                  <Avatar shape="square" icon={<UserOutlined />} />
                </Badge>
              </span>
              {admin.first_name + " " + admin.last_name}
            </Nav.Link>

            <PoweroffOutlined
              style={{
                color: "white",
                marginLeft: "10px",
                position: "relative",
                top: "15px",
              }}
              onClick={() => {
                axios.post(`${BASE_URL}/users/logout`);
              }}
            />
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Topbar;
