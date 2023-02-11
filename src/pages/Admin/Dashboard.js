import React, { useContext } from "react";
import { adminContext } from "../../components/Contexts/AppContext";
import "../pages.css";
import Sidebar from "../../components/Navigation/Admin/Sidebar";
import Topbar from "../../components/Navigation/Admin/Topbar";
import Ames from "../../components/Ames/Ames";
import Login from "../../components/Authentification/Admin/Login";

const Dashboard = () => {
  const admin = useContext(adminContext);

  return (
    <>
      {admin ? (
        <div className="dashboard container-fluid col-12">
          <Topbar />
          <div className="row col-12 content-saul">
            <Sidebar />
            <Ames />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Dashboard;
