import React from "react";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import { FlagTwoTone } from "@ant-design/icons";
import moment from "moment";

const LeftSidebar = ({ posts }) => {
  const member = {
    _id: "63ca88061d9d3df771775229",
    email: "maurice@gmail.com",
    password: "$2b$10$lkh1CvlIeamkXW29H60CVeXGs.MxnuJeZYE4Cbbljm.hnfh3SZH/O",
    first_name: "Maurice",
    last_name: "NAHOUNME",
    civility: "M",
    tel: "0753482251",
    nationality: "Bénin",
    num_street: "47 Avenue Paul Valéry",
    address: "",
    additional_address: "",
    postal_code: "95200",
    city: "Sarcelles",
    createdAt: "2023-01-20T12:24:38.518+00:00",
    updatedAt: "1674874342642",
    picture: "./uploads/profil/Maurice.jpg",
  };

  return (
    <div className="left-sidebar col-3 text-center">
      <img
        src={member && member.picture}
        alt="member"
        className="commenter-picture"
        style={{
          width: "90px",
          height: "90px",
          border: "none",
          boxShadow: "none",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "25px",
        }}
      />
      <p style={{ marginTop: "20px" }}>
        <strong>{member.first_name + " " + member.last_name}</strong>
      </p>
      <h6>Membre depuis le {moment(member.createdAt).format("LL")}</h6>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "30px 10px ",
        }}
      >
        <div>
          {
            posts.filter(
              (post) =>
                post.author.first_name === member.first_name &&
                post.author.last_name === member.last_name
            ).length
          }{" "}
          <br />
          <span style={{ color: "grey" }}>Posts</span>
        </div>

        <div>
          10
          <br />
          <span style={{ color: "grey" }}>Followers</span>
        </div>

        <div>
          10
          <br />
          <span style={{ color: "grey" }}>Following</span>
        </div>
      </div>
      <Divider />
      {/* <FlagTwoTone /> <span>{member.member.nationality}</span> */}
    </div>
  );
};

export default LeftSidebar;
