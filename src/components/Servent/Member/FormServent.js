/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../config";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} est obligatoire!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const FormServent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Bravo! vous êtes bien enrégistré",
      style: { marginTop: "99px", fontSize: "1.1em" },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/servent`, {
        first_name: firstName,
        last_name: lastName,
        phone,
        department,
      })
      .then((res) => {
        success();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  return (
    <div>
      {contextHolder}
      <Form
        {...layout}
        name="nest-messages"
        onSubmit={handleSubmit}
        style={{
          maxWidth: 600,
          // height: 400,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="nom"
          label="Nom"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setLastName(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="prénom"
          label="Prénom"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setFirstName(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="tel"
          label="Téléphone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input onChange={(e) => setPhone(e.target.value)} />
        </Form.Item>

        <Form.Item label="Département">
          <Select name="départ" onChange={(e) => setDepartment(e)} allowClear>
            <Option value="Accueil">Accueil</Option>
            <Option value="Communication">Communication</Option>
            <Option value="Choral">Choral</Option>
            <Option value="Ecodim">Ecodim</Option>
            <Option value="Sécurité">Sécurité</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormServent;
