import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Authentification/Member/Login";
import SignupResult from "../Authentification/Member/SignupResult";
import Blog from "../Blog/Blog";
import Signup from "../Authentification/Member/Signup";
import Donate from "../Donate/Donate";
import Video from "../Media/Video";

const ProviderRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/video" element={<Video />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/welcome" element={<SignupResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ProviderRouter;
