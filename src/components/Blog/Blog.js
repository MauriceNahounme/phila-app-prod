import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./blog.css";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { FileImageOutlined, VideoCameraOutlined } from "@ant-design/icons";
import CarouselMember from "../Navigation/Member/Carousel";
import Footer from "../Navigation/Member/Footer";
import Topbar from "../Navigation/Member/Topbar";
import Sidebar from "./Sidebar";
import moment from "moment";
import Post from "./Post";
import Login from "../Authentification/Member/Login";
import LeftSidebar from "./LeftSidebar";
import { BASE_URL } from "../../config";

const Blog = () => {
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
    createdAt: "1674217478518",
    updatedAt: "1674874342642",
    picture: "./uploads/profil/Maurice.jpg",
  };
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);

  // console.log("m", member);

  const getPosts = () => {
    axios.get(`${BASE_URL}/blog`).then((value) => {
      setPosts(value.data);
    });
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message) {
      const data = new FormData();
      data.append("title", title);
      data.append("content", message.replace(/\n/g, `\n`));
      data.append("author", member.member._id);
      if (file) data.append("file", file);
      data.append("video", video);

      axios.post(`${BASE_URL}/blog`, data).then(() => {
        setConfirm("Votre post est bien enregistré");
        document.getElementById("message").value = "";
        getPosts();
      });
    } else {
      setError("Veuillez laisser un message");
    }
  };

  useEffect(() => {
    getPosts();
  });

  useEffect(() => {
    if (!member.member) {
      setLoading(true);
    }
  }, [member]);

  return (
    <>
      {member ? (
        <div className="blog">
          <Topbar />
          <CarouselMember />
          <div>
            <Form className="mt-3 col-8 blog-form" onSubmit={handleSubmit}>
              <div className="blog-form-input">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  {/* <Form.Label>Nouveau post</Form.Label> */}
                  <Form.Control
                    as="textarea"
                    id="message"
                    rows={5}
                    onChange={(e) => setMessage(e.target.value)}
                    className="blog-form-textarea mb-3"
                    placeholder="Quoi de neuf..."
                  />
                </Form.Group>

                <div>
                  <span
                    style={{
                      backgroundColor: "#eee",
                      padding: "10px",
                      borderRadius: "10px",
                      marginLeft: "15px",
                    }}
                  >
                    <FileImageOutlined className="file-icon" />
                    Photo
                  </span>
                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    className="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handlePicture}
                  />
                  {/* <VideoCameraOutlined /> */}
                </div>
              </div>

              <Button type="submit" className="btn-post text-center">
                Poster
              </Button>
            </Form>

            <div className="blog-content container">
              <LeftSidebar posts={posts} />

              <div className="col-7 post-res">
                {posts
                  .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
                  .map((post, index) => {
                    return <Post key={index} post={post} />;
                  })}
              </div>

              <Sidebar />
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Blog;
