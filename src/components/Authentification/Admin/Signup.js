/* eslint-disable react/jsx-no-duplicate-props */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const data = {
    first_name: firstname,
    last_name: lastname,
    email,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/users/signup`, data)
      .then((res) => {
        navigate("/admin/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <div className="form-div container-fluid col-12">
        <div className="login-img" style={{ height: "100vh" }}>
          <div></div>
          <h2 className="text-center mt-5" style={{ color: "white" }}>
            Phila, cité des adorateurs
          </h2>
        </div>

        <Form className="form-login text-center" onSubmit={handleSubmit}>
          <h1 className="mb-5">
            Bienvenue sur, <strong>PhilApp</strong>
          </h1>
          <h2 style={{ color: "#1C34E0" }} className="mb-3">
            <strong>Suivi des nouveaux venus</strong>
          </h2>

          <p style={{ color: "red" }}>{error && error}</p>

          <FloatingLabel
            controlId="floatingText"
            label="Nom"
            className="mb-3 form-input"
          >
            <Form.Control
              type="text"
              placeholder="Nom"
              onChange={(e) => setLastname(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingText"
            label="Prénom"
            className="mb-3 form-input"
          >
            <Form.Control
              type="text"
              placeholder="Prénom"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3 form-input"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
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
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Confirmation mot de passe"
            className="mb-3 form-input"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              onBlur={(e) => {
                setPasswordConfirmation(e.target.value);
                passwordConfirmation !== password
                  ? setError("Mot de passe non conforme")
                  : setError("");
              }}
            />
          </FloatingLabel>

          <Button
            variant="primary"
            type="submit"
            className={error ? "disabled" : "mb-5"}
          >
            Suivant
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
