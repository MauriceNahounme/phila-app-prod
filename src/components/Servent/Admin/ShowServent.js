import React from "react";
import { Drawer, Space, Button } from "antd";
import moment from "moment";
import "moment/locale/fr";

const ShowServent = ({ open, onClose, servent }) => {
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
          <p>Nom : {servent?.first_name}</p>
          <p>Nationalité : {servent?.nationality}</p>
          <p>
            Évangelisé par : {servent?.win_by?.first_name} le{" "}
            {moment(servent?.createdAt).format("LLLL")}
          </p>
        </div>
      </Drawer>
    </div>
  );
};

export default ShowServent;
