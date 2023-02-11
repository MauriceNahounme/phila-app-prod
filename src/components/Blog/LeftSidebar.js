import React from "react";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import { FlagTwoTone } from "@ant-design/icons";
import moment from "moment";

const LeftSidebar = ({ posts }) => {
  const member = useSelector((state) => state.memberReducer);

  return (
    <div className="left-sidebar col-3 text-center">
      <img
        src={member && member.member.picture}
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
        <strong>
          {member.member.first_name + " " + member.member.last_name}
        </strong>
      </p>
      <h6>Membre depuis le {moment(member.member.createdAt).format("LL")}</h6>
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
                post.author.first_name === member.member.first_name &&
                post.author.last_name === member.member.last_name
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
