import React, { useContext } from "react";
import { uidContext } from "../../components/Contexts/AppContext";
import Signup from "../../components/Authentification/Member/Signup";
import Login from "../../components/Authentification/Member/Login";
import Dashboard from "../Admin/Dashboard";

const Home = () => {
  const user = useContext(uidContext);

  return <div>{<Signup />}</div>;
};

export default Home;
