/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import { Modal, Button, Form, Select, Input, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../config";
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

const MediaModal = ({ open, handleOk, handleCancel }) => {
  const [type, setType] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Bravo! média bien enrégistré",
      style: { marginTop: "99px", fontSize: "1.1em" },
    });
  };

  const handleSubmit = () => {
    axios
      .post(`${BASE_URL}/medias`, {
        type,
        author,
        title,
        description,
        url,
      })
      .then((value) => {
        success();
        handleCancel();
      });
  };

  return (
    <div>
      {contextHolder}
      <Modal
        open={open}
        title="Ajouter un média"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Envoyer
          </Button>,
        ]}
      >
        <div>
          <Form
            {...layout}
            name="nest-messages"
            style={{
              maxWidth: 600,
            }}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select name="type" onChange={(e) => setType(e)} allowClear>
                <Option value="Vidéo">Vidéo</Option>
                <Option value="Podcast">Podcast</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="author"
              label="Auteur"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setAuthor(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="title"
              label="Titre"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="url"
              label="Lien"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setUrl(e.target.value)} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default MediaModal;
