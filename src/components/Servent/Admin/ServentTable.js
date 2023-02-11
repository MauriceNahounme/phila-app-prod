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
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import Topbar from "../../Navigation/Admin/Topbar";
import Sidebar from "../../Navigation/Admin/Sidebar";
import ShowServent from "./ShowServent";
import ServentStats from "../../Statistics/ServentStats";
import { BASE_URL } from "../../../config";
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

const ServentTable = () => {
  // const user = useSelector((state) => state.userReducer);
  const [api, contextHolder] = notification.useNotification();
  const [servents, setServents] = useState([]);
  const [open, setOpen] = useState(false);
  const [showServent, setShowServent] = useState({});
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const getServents = () => {
    axios
      .get(`${BASE_URL}/servent/`)
      .then((value) => {
        setServents(value.data);
      })
      .catch((err) => {
        throw err;
      });
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
        if (
          row.department === "Accueil" ||
          row.department === "Communication" ||
          row.department === "Choral" ||
          row.department === "Ecodim" ||
          row.department === "Média" ||
          row.department === "Sécurité"
        ) {
          newData.push(row);
          axios.put(`${BASE_URL}/servent/${key}`, row).then(() => {
            notifMessage("success", "Modification", "Modification réussie");
            window.location.reload();
          });
          setEditingKey("");
        } else {
          notifMessage(
            "error",
            "Modification échouée",
            "Verifiez l'orhtographe du département"
          );
        }
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const showServentModal = (record) => {
    const servent = servents.find((servent) => servent._id === record.key);
    setShowServent(servent);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDeleteServent = (record) => {
    confirm({
      title: "Voulez-vous vraiment supprimer cette âme ?",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      okText: "Oui",
      okType: "danger",
      cancelText: "Non",
      onOk() {
        axios.delete(`${BASE_URL}/servent/${record.key}`).then(() => {
          notifMessage("success", "Suppresion", "Supression réussie");
          window.location.reload();
        });
      },
    });
  };

  const columns = [
    // {
    //   title: "Genre",
    //   key: "civility",
    //   dataIndex: "civility",
    //   editable: true,
    //   render: (civility) => (
    //     <>
    //       {civility === "M" ? (
    //         <Tag>
    //           <strong style={{ color: "green" }}>{civility}</strong>
    //         </Tag>
    //       ) : (
    //         <Tag>
    //           <strong style={{ color: "#eb2f96" }}>{civility}</strong>
    //         </Tag>
    //       )}
    //     </>
    //   ),
    // },
    {
      title: "Prénom",
      dataIndex: "first_name",
      key: "first_name",
      defaultSortOrder: "descend",
      editable: true,
    },
    {
      title: "Nom",
      dataIndex: "last_name",
      key: "last_name",
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
      title: "Département",
      dataIndex: "department",
      key: "department",
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
              onClick={() => handleDeleteServent(record)}
            />
            <EyeOutlined
              style={{ color: "green" }}
              onClick={() => showServentModal(record)}
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

  let data = servents.map((servent) => {
    return {
      key: servent._id,
      // civility: servent.civility,
      last_name: `${servent.last_name ? servent.last_name : "-"}`,
      first_name: `${servent.first_name ? servent.first_name : ""}`,
      tel: servent.phone,
      department: servent.department,
      date: moment(servent.createdAt).format("LLL"),
    };
  });

  useEffect(() => {
    getServents();
  }, []);

  return (
    <div className="row col-12 content-saul">
      <Topbar />
      <div className="row col-12 content-saul">
        <Sidebar />
        <div className="col-10" style={{ marginTop: "100px" }}>
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
            <ShowServent open={open} onClose={onClose} servent={showServent} />

            <ServentStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServentTable;
