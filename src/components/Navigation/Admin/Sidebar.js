import React, { useState } from "react";
import "../navigation.css";
import {
  HomeOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Tableau de bord", "sub1", <HomeOutlined />, [
    getItem("Membres", "1"),
    getItem("Serviteurs", "2"),
    getItem("Média", "3"),
  ]),
  getItem("Documents", "sub3", <FolderOpenOutlined />, [
    getItem("Xls", "5"),
    getItem("Pdf", "6"),
  ]),
  getItem("Compte", "sub4", <SettingOutlined />, [
    getItem("Mon Profil", "7"),
    getItem("Déconnexion", "8"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];

const Sidebar = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleClick = (keys) => {
    if (keys.key === "1") {
      window.location = "/admin/add_member";
    }

    if (keys.key === "2") {
      window.location = "/admin/servents";
    }

    if (keys.key === "3") {
      window.location = "/admin/media";
    }
  };

  return (
    <div className="sidebar col-2">
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={handleClick}
        style={{ backgroundColor: "#F6F6FF" }}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
