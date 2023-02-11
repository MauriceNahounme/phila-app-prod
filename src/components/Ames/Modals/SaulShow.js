import React from "react";
import { Drawer, Space, Button } from "antd";
import moment from "moment";
import "moment/locale/fr";

const SaulShow = ({ open, onClose, saul }) => {
  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
        width={400}
        key="right"
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <div>
          <p>Nom : {saul?.first_name}</p>
          <p>Nationalité : {saul?.nationality}</p>
          <p>
            Évangelisé par : {saul?.win_by?.first_name} le{" "}
            {moment(saul?.createdAt).format("LLLL")}
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default SaulShow;
