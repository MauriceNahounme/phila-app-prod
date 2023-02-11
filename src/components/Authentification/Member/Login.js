import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../authentification.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import authHeader from "../../../utils/authHeader";
import { BASE_URL } from "../../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${BASE_URL}/members/login`,
        JSON.stringify({
          email,
          password,
        }),
        { "Access-Control-Allow-Credentials": true }
      )
      .then((res) => {
        localStorage.setItem("tokenMember", res.data.tokenMember);
        authHeader(res.data.tokenMember);
        setUser(res.data);
        window.location = "/";
      })
      .catch((err) => {
        console.log("yes");
        setError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <div className="form-div container-fluid">
        <div className="login-img">
          <div></div>
          <h2 className="text-center mt-5" style={{ color: "white" }}>
            Phila, cité des adorateurs
          </h2>
        </div>

        <Form className="form-login text-center" onSubmit={handleSubmit}>
          <img src="./img/LOGO-PHILA.png" className="img" alt="Logo phila" />
          <h1 className="mb-3">
            Bienvenue sur <strong>{`${process.env.REACT_APP_NAME}`}</strong>
          </h1>
          <h1 style={{ color: "#1C34E0" }}>
            <strong>Connectez-vous !</strong>
          </h1>

          <p className="mt-3" style={{ color: "red" }}>
            {error && error}
          </p>

          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3 form-input"
          >
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Mot de passe"
            className="mb-3 form-input"
          >
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>

          <Form.Group className="mb-3 container-fluid btn-submit">
            <NavLink to="/" className="nav-link">
              <p style={{ color: "#1C34E0" }}>Mot de passe oublié ?</p>
            </NavLink>

            <Button type="submit" style={{ padding: "10px" }}>
              Connexion
            </Button>

            <NavLink to="/signup" className="nav-link">
              <p style={{ color: "#1C34E0" }}>S'inscrire</p>
            </NavLink>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Login;
