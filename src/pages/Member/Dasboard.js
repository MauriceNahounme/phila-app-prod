import React, { useState } from "react";
import "../pages.css";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import Login from "../../components/Authentification/Member/Login";
import CarouselMember from "../../components/Navigation/Member/Carousel";
import Topbar from "../../components/Navigation/Member/Topbar";
import Footer from "../../components/Navigation/Member/Footer";

const Dasboard = () => {
  const member = useSelector((state) => state.memberReducer);
  const [date, setDate] = useState(new Date());

  console.log("m", member);

  return (
    <>
      {member.member ? (
        <div className="col-12" style={{ width: "100vw" }}>
          <Topbar />
          <CarouselMember />
          <div className="col-12">
            <Calendar onChange={setDate} value={date} />
          </div>

          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Dasboard;
