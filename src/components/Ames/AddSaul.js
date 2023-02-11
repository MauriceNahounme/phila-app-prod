import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "../../pages/pages.css";
import { notification } from "antd";
import Sidebar from "../Navigation/Admin/Sidebar";
import Topbar from "../Navigation/Admin/Topbar";
import {
  Button,
  Col,
  Form,
  Row,
  FloatingLabel,
  FormSelect,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../config";

const AddSaul = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [civility, setCivility] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nationality, setNationality] = useState("");
  const [winAt, setWinAt] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [additionalAddress, setAdditionalAddress] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [city, setCity] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/sauls`, {
        first_name: firstName,
        last_name: lastName,
        civility,
        tel: phone,
        birth: birthday,
        nationality,
        win_by: user._id,
        win_at: winAt,
        num_street: street,
        address,
        additional_address: additionalAddress,
        postal_code: codePostal,
        city,
      })
      .then((value) => {
        api.info({
          message: "Ajouter une âme",
          description: `${firstName} ${lastName} a été bien ajouté`,
          placement: "topRight",
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dashboard container-fluid col-12">
      {contextHolder}
      <Topbar />
      <div className="row col-12 content-saul">
        <Sidebar />
        <div className="col-10" style={{ marginTop: "50px" }}>
          <Form
            className="text-center"
            onSubmit={handleSubmit}
            style={{ width: "70%", margin: "auto" }}
          >
            <h1 className="mb-5 mt-5" style={{ color: "#1C34E0" }}>
              <strong>Ajouter une nouvelle âme</strong>
            </h1>

            <FloatingLabel
              controlId="floatingText"
              label="Nom"
              className="mb-3 form-input"
            >
              <Form.Control
                type="text"
                placeholder="Nom"
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FloatingLabel>

            <FormSelect
              controlId="floatingText"
              label="Genre"
              className="mb-3 form-input"
              onChange={(e) => setCivility(e.target.value)}
            >
              <option>Genre</option>
              <option value="F">F</option>
              <option value="M">M</option>
            </FormSelect>

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

            <FloatingLabel
              controlId="floatingText"
              label="Gagnée à"
              className="mb-3 form-input"
            >
              <Form.Control
                type="text"
                placeholder="Gagnée à"
                onChange={(e) => setWinAt(e.target.value)}
              />
            </FloatingLabel>

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

            <div
              // className="row"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                className="mb-5 col-3"
                onClick={(e) => {
                  navigate("/dashboard");
                  window.location.reload();
                }}
              >
                Retour
              </Button>

              <Button
                variant="primary"
                type="submit"
                className="mb-5 col-3"
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
                Ajouter
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddSaul;
