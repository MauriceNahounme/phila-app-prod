/* eslint-disable react/jsx-no-duplicate-props */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Space } from "antd";
import { Button, Col, Form, Row, FloatingLabel } from "react-bootstrap";
import { BASE_URL } from "../../../config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [gender, setGender] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [city, setCity] = useState("");
  const [church, setChurch] = useState("");
  const [baptism, setBaptism] = useState();
  const [pray, setPray] = useState("");

  const [firstComponent, setFirstComponent] = useState(true);
  const [secondComponent, setSecondComponent] = useState(false);
  const [thirdComponent, setThirdComponent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const data = {
    email,
    password,
    first_name: firstname,
    last_name: lastname,
    civility: gender,
    tel: phone,
    birthday,
    nationality,
    num_street: street,
    address,
    additional_address: additionalAddress,
    postal_code: codePostal,
    city,
    church,
    pray,
  };

  const handleNext = () => {
    setFirstComponent(false);
    setSecondComponent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/members`, data)
      .then((res) => {
        navigate("/welcome", { state: { firstname, lastname } });
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
        throw err;
      });
  };

  return (
    <>
      {firstComponent && (
        <div className="form-div container-fluid col-12">
          <div className="login-img" style={{ height: "100vh" }}>
            <div></div>
            <h2 className="text-center mt-5" style={{ color: "white" }}>
              Phila, cité des adorateurs
            </h2>
          </div>

          <Form className="form-login text-center" onSubmit={handleSubmit}>
            <img src="./img/LOGO-PHILA.png" className="img" alt="Logo phila" />
            <h1 className="mb-3">
              Bienvenue sur, <strong>PhilApp</strong>
            </h1>
            <h2 style={{ color: "#1C34E0" }}>
              <strong>Je suis nouveau !</strong>
            </h2>

            <p className="mt-5" style={{ color: "red" }}>
              {error && error}
            </p>

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
              className={
                error ||
                password.length === 0 ||
                passwordConfirmation.length === 0
                  ? "disabled"
                  : "mb-5"
              }
              onClick={handleNext}
            >
              Suivant
            </Button>
          </Form>
        </div>
      )}

      {secondComponent && (
        <div className="form-div container-fluid col-12">
          <div className="login-img">
            <div></div>
            <h2 className="text-center mt-5" style={{ color: "white" }}>
              Phila, cité des adorateurs
            </h2>
          </div>

          <Form className="form-login text-center" onSubmit={handleSubmit}>
            <h1 className="mb-3">
              <strong>MyPhilaApp</strong>
            </h1>
            <h1 style={{ color: "#1C34E0" }}>
              <strong>Connectez-vous !</strong>
            </h1>

            <FloatingLabel
              controlId="floatingSelect"
              label="Genre"
              className="mb-3 form-input"
              onChange={(e) => setGender(e.target.value)}
            >
              <Form.Select>
                <option>Genre</option>
                <option value="F">F</option>
                <option value="M">M</option>
              </Form.Select>
            </FloatingLabel>

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
              controlId="floatingText"
              label="Date de naissance"
              className="mb-3 form-input"
            >
              <Form.Control
                type="date"
                placeholder="Naissance"
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingText"
              label="Nationalité"
              className="mb-3 form-input"
            >
              <Form.Control
                type="text"
                placeholder="Nationalité"
                onChange={(e) => setNationality(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingText"
              label="Téléphone"
              className="mb-3 form-input"
            >
              <Form.Control
                type="text"
                placeholder="Téléphone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </FloatingLabel>

            <Button
              variant="primary"
              type="submit"
              className="mb-5"
              onClick={() => {
                setSecondComponent(false);
                setThirdComponent(true);
              }}
              // disabled={
              //   lastname &&
              //   firstname &&
              //   birthday &&
              //   nationality &&
              //   phone &&
              //   street &&
              //   address &&
              //   additionalAddress &&
              //   codePostal &&
              //   city
              //     ? false
              //     : true
              // }
            >
              Suivant
            </Button>
          </Form>
        </div>
      )}

      {thirdComponent && (
        <div className="form-div container-fluid col-12">
          <div className="login-img" style={{ height: "100vh" }}>
            <div></div>
            <h2 className="text-center mt-5" style={{ color: "white" }}>
              Phila, cité des adorateurs
            </h2>
          </div>

          <Form className="form-login text-center" onSubmit={handleSubmit}>
            <h1 className="mb-5">
              <strong>MyPhilaApp</strong>
            </h1>

            <Row>
              <Form.Group as={Col}>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Rue"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Rue"
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col}>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Adresse"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Adresse"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Complément d'adresse"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Complément"
                    onChange={(e) => setAdditionalAddress(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col}>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="CP"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="CP"
                    onChange={(e) => setCodePostal(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group as={Col}>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Ville"
                  className="mb-5"
                >
                  <Form.Control
                    type="text"
                    placeholder="Ville"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
            </Row>

            <FloatingLabel
              controlId="floatingText"
              label="De quelle église venez-vous ?"
              className="mb-3 form-input"
            >
              <Form.Control
                type="text"
                placeholder="Church"
                onChange={(e) => setChurch(e.target.value)}
              />
            </FloatingLabel>

            <div
              style={{
                border: "1px solid #CED4DA",
                width: "100%",
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px",
                borderRadius: "5px",
              }}
              className="text-left"
            >
              <p>Avez-vous été baptisé ?</p>
              <Radio.Group
                onChange={(e) => setBaptism(e.target.value)}
                value={baptism}
              >
                <Space direction="vertical">
                  <Radio value={true}>Oui</Radio>
                  <Radio value={false}>Non</Radio>
                </Space>
              </Radio.Group>
            </div>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Avez-vous besoin de prières ?"
              className="mb-3 form-input"
            >
              <Form.Control
                as="textarea"
                placeholder="Nom"
                onChange={(e) => setPray(e.target.value)}
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            <Button type="submit">Soumettre</Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default Signup;
