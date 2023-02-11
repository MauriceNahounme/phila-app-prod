import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Space,
  Table,
  Tag,
  Modal,
  notification,
  Form,
  InputNumber,
  Popconfirm,
  Typography,
  Input,
  Button,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import Topbar from "../Navigation/Admin/Topbar";
import Sidebar from "../Navigation/Admin/Sidebar";
import MediaModal from "./MediaModal";
import { BASE_URL } from "../../config";
const { confirm } = Modal;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Veuillez entrer un ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const MediaTable = () => {
  const [api, contextHolder] = notification.useNotification();
  const [medias, setMedias] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
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

  const notifMessage = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      if (key) {
        newData.push(row);
        axios.put(`${BASE_URL}/medias/${key}`, row).then(() => {
          notifMessage("success", "Modification", "Modification réussie");
          window.location.reload();
        });
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDeleteMedia = (record) => {
    confirm({
      title: "Voulez-vous vraiment supprimer cette âme ?",
      icon: <ExclamationCircleFilled />,
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        axios.delete(`${BASE_URL}/medias/${record.key}`).then(() => {
          // notifMessage("success", "Suppresion", "Supression réussie");
          window.location.reload();
        });
      },
    });
  };

  const getMedias = () => {
    axios.get(`${BASE_URL}/medias`).then((value) => {
      setMedias(value.data);
    });
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      defaultSortOrder: "descend",
      editable: true,
      render: (type) => (
        <>
          {type === "video" ? (
            <Tag>
              <strong style={{ color: "red" }}>{type}</strong>
            </Tag>
          ) : (
            <Tag>
              <strong style={{ color: "blue" }}>{type}</strong>
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Auteur",
      dataIndex: "author",
      key: "author",
      defaultSortOrder: "descend",
      editable: true,
    },
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
      editable: true,
    },
    {
      title: "Lien",
      dataIndex: "url",
      key: "url",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return !editable ? (
          <Space size="middle">
            <EditOutlined
              style={{ color: "#1C34E0" }}
              onClick={() => edit(record)}
            />
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => handleDeleteMedia(record)}
            />
          </Space>
        ) : (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Ok
            </Typography.Link>
            <Popconfirm
              title="Voulez-vous annuler la modification"
              onConfirm={cancel}
            >
              <a>Annuler</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  let data = medias.map((media) => {
    return {
      key: media._id,
      type: `${media.type ? media.type : "-"}`,
      author: `${media.author ? media.author : ""}`,
      title: media.title,
      url: media.url,
      description: media.description,
    };
  });

  useEffect(() => {
    getMedias();
  }, []);

  return (
    <div className="row col-12 content-saul">
      <Topbar />
      <div className="row col-12 content-saul">
        <Sidebar />
        <div className="col-10" style={{ marginTop: "100px" }}>
          {contextHolder}
          <div>
            <Form form={form} component={false}>
              <Table
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                columns={mergedColumns}
                dataSource={data}
                className="table-column"
              />
            </Form>

            <Button
              onClick={showModal}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Ajouter un média
            </Button>

            <MediaModal
              open={open}
              handleCancel={handleCancel}
              handleOk={handleOk}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaTable;
