import React from "react";
import { Button, Modal } from "antd";
import FormServent from "./FormServent";

const FormModal = ({ open, handleOk, handleCancel, loading }) => {
  return (
    <>
      <Modal
        open={open}
        title="Je suis serviteur"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleOk}
          // >
          //   Envoyer
          // </Button>
        ]}
      >
        <FormServent />
      </Modal>
    </>
  );
};

export default FormModal;
