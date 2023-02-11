/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { uidContext, adminContext } from "./components/Contexts/AppContext";
import Routers from "./components/Routes";
import RouterAdmin from "./components/Routes/adminRouter";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMember } from "./actions/member.actions";
import { getAdmin } from "./actions/admin.actions";
import { BASE_URL } from "./config";

const App = () => {
  const dispatch = useDispatch();
  const [member, setMember] = useState(null);
  const [admin, setAdmin] = useState(null);

  const verifyMember = async () => {
    await axios
      .get(`${BASE_URL}/jwt`, { withCredentials: true })
      .then((value) => {
        setMember(value.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (member) {
      dispatch(getMember(member));
    }
  };

  const verifyAdmin = async () => {
    await axios
      .get(`${BASE_URL}/jwt_admin`, { withCredentials: true })
      .then((value) => {
        setAdmin(value.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (admin) {
      dispatch(getAdmin(admin));
    }
  };

  useEffect(() => {
    verifyMember();
    verifyAdmin();
  }, [member, admin, dispatch]);

  return (
    <>
      <div>
        <uidContext.Provider value={member}>
          <Routers />
        </uidContext.Provider>

        <adminContext.Provider value={admin}>
          <RouterAdmin />
        </adminContext.Provider>
      </div>
    </>
  );
};

export default App;
