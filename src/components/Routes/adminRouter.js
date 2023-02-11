import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Admin/Dashboard";
import AddSaul from "../Ames/AddSaul";
import Login from "../Authentification/Admin/Login";
import Signup from "../Authentification/Admin/Signup";
import MediaTable from "../Media/MediaTable";
import ServentTable from "../Servent/Admin/ServentTable";

const ProviderRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="admin/login" element={<Login />} />
          <Route path="/admin/add_member" element={<AddSaul />} />
          <Route path="admin/servents" element={<ServentTable />} />
          <Route path="admin/media" element={<MediaTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ProviderRouter;
