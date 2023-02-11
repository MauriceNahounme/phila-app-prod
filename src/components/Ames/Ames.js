/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ames.css";
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
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import SaulShow from "./Modals/SaulShow";
import { useSelector } from "react-redux";
import WinerStats from "../Statistics/WinerStats";
import moment from "moment";
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
              message: `Please Input ${title}!`,
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

const Ames = () => {
  const user = useSelector((state) => state.userReducer);
  const [api, contextHolder] = notification.useNotification();
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [showSaul, setShowSaul] = useState({});
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

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
        axios.put(`${BASE_URL}/sauls/${key}`, row).then(() => {
          notifMessage("success", "Modification", "Âme bien modifiée");
        });
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const showSaulModal = (record) => {
    const saul = members.find((member) => member._id === record.key);
    setShowSaul(saul);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const notifMessage = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

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

  const handleDeleteSaul = (record) => {
    confirm({
      title: "Êtes-vous sûr de vouloir supprimer cette âme ?",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        axios.delete(`${BASE_URL}/sauls/${record.key}`).then(() => {
          notifMessage("success", "Suppresion", "Âme bien supprimée");
        });
      },
    });
  };

  useEffect(() => {
    getMembers();
  }, [user]);

  const columns = [
    {
      title: "Genre",
      key: "civility",
      dataIndex: "civility",
      editable: true,
      render: (civility) => (
        <>
          {civility === "M" ? (
            <Tag>
              <strong style={{ color: "green" }}>{civility}</strong>
            </Tag>
          ) : (
            <Tag>
              <strong style={{ color: "#eb2f96" }}>{civility}</strong>
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Nom",
      dataIndex: "last_name",
      key: "last_name",
      defaultSortOrder: "descend",
      editable: true,
    },
    {
      title: "Prénom",
      dataIndex: "first_name",
      key: "first_name",
      defaultSortOrder: "descend",
      editable: true,
    },
    {
      title: "Tel",
      dataIndex: "tel",
      key: "tel",
      editable: true,
    },
    {
      title: "Nationalité",
      dataIndex: "nationality",
      key: "nationality",
      editable: true,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
              onClick={() => handleDeleteSaul(record)}
            />
            <EyeOutlined
              style={{ color: "green" }}
              onClick={() => showSaulModal(record)}
              id={record.key}
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

  let data = members.map((saul) => {
    return {
      key: saul._id,
      civility: saul.civility,
      last_name: `${saul.last_name ? saul.last_name : "-"}`,
      first_name: `${saul.first_name ? saul.first_name : ""}`,
      tel: saul.tel,
      nationality: saul.nationality,
      date: moment(saul.createdAt).format("LLL"),
      // win_by: `${saul.win_by.first_name} ${saul.win_by.last_name}`,
      // win_at: saul.win_at,
    };
  });

  return (
    <div className="col-10" style={{ marginTop: "110px" }}>
      {contextHolder}
      <div>
        <p></p>
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
        <SaulShow open={open} onClose={onClose} saul={showSaul} />

        <WinerStats />
      </div>
    </div>
  );
};

export default Ames;
