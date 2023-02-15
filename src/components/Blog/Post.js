/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./blog.css";
import {
  HeartOutlined,
  CommentOutlined,
  EditOutlined,
  MoreOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../config";

const Post = ({ post }) => {
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
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState("");
  const [comment, setComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [liked, setLiked] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();

    axios.put(`${BASE_URL}/blog/${post._id}`, {
      content: edited ? edited : post.content,
    });
    setEditing(false);
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (commentContent) {
      axios.patch(`${BASE_URL}/blog/comments/${post._id}`, {
        commenterId: member._id,
        comment: commentContent,
      });
    }
    document.getElementById("comment").value = "";
  };

  const unlike = () => {};

  const like = () => {
    axios.patch(`${BASE_URL}/blog/likes-post/${post._id}`, {
      id: member._id,
    });
    setLiked(true);
  };

  useEffect(() => {
    if (post.likers.includes(member._id)) setLiked(true);
    else setLiked(false);
  }, [member._id, post.likers, liked]);

  // useEffect(() => {
  //   like();
  //   unlike();
  // }, [liked]);

  return (
    <div className="post">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={post.author.picture}
          alt="commenter-pic"
          className="commenter-picture"
          style={{ margin: "0" }}
        />
        <h5 className="title">
          <strong>
            {post.author.first_name + " " + post.author.last_name}
          </strong>{" "}
          <br />
          <span className="sub-title">
            Publié le {moment(post.createdAt).format("LLL")}
          </span>
        </h5>
      </div>

      <p>
        {editing ? (
          <textarea
            className="blog-textarea"
            defaultValue={post.content}
            onChange={(e) => setEdited(e.target.value)}
          ></textarea>
        ) : (
          <p>{edited ? edited : post.content}</p>
        )}
      </p>

      {post.picture && (
        <img src={post.picture} alt="post-img" className="card-pic" />
      )}

      <div className="blog-icon">
        <div>
          {
            <HeartOutlined
              onClick={liked ? unlike : like}
              className={
                post.likers.includes(member._id) && liked ? "like" : ""
              }
            />
          }{" "}
          <span style={{ fontSize: "0.7em" }}>{post.likers.length}</span>
        </div>

        <div>
          <CommentOutlined onClick={() => setComment(!comment)} />{" "}
          <span style={{ fontSize: "0.7em" }}>{post.comments.length}</span>
        </div>

        {editing ? (
          <CheckOutlined onClick={handleEdit} />
        ) : (
          member._id === post.author._id && (
            <EditOutlined onClick={() => setEditing(true)} />
          )
        )}
      </div>

      {comment && (
        <div className="blog-comment">
          <textarea
            style={{ height: "50px" }}
            id="comment"
            className="blog-textarea"
            placeholder="Votre commentaire..."
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <Button
            className="blog-comment"
            onClick={addComment}
            disabled={commentContent ? "" : "disabled"}
          >
            Commenter
          </Button>
        </div>
      )}

      {comment &&
        post.comments.slice(0, 5).map((comment) => {
          return (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                src={comment.commenterId.picture}
                alt="commenter-pic"
                className="commenter-picture"
              />
              <div className="blog-commenter">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>
                    {comment.commenterId.first_name +
                      " " +
                      comment.commenterId.last_name}
                  </strong>
                  <span>{moment(comment.timestamp).fromNow()}</span>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
