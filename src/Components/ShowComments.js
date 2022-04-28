import { useState, useContext } from "react";
import "../styles/ShowComment.css";
import { Modal, Button, Textarea, Loader } from "@mantine/core";

import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User";
import { ErrorAlert } from "./ErrorAlert";
import moment from "moment";
import { MdVerified } from "react-icons/md";
import CommentMenu from "./CommentMenu";
import axios from "axios";
const ShowComments = ({ comments, setComments, setdeleting }) => {
  const [LikeError, setLikeError] = useState(false);
  const [opened, setOpened] = useState(false);
  const [text, settext] = useState("");
  const [replyingto, setreplyingto] = useState("");
  const { UserInfo } = useContext(UserContext);
  const [commentid, setcommentid] = useState("");
  const [commenterror, setcommenterror] = useState("");
  const history = useHistory();
  const closeFunc = () => {
    setOpened(false);
    setcommenterror("");
    setreplyingto("");
    setcommentid("");
    settext("");
  };
  const commentreply = () => {
    setdeleting(false);

    UserInfo.loginStatus
      ? text
        ? axios
            .post(
              "https://momofirstapi.herokuapp.com/NestedComments/addComment",
              {
                CommentId: commentid,
                replyText: text,
                repliedTo: replyingto,
              },

              {
                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                },
              }
            )
            .then((res) => {
              if (res.data.error) {
                setcommenterror(res.data.message);
              } else {
                closeFunc();
                setdeleting(true);
              }
            })
            .catch((error) => {
              if (error.response) {
                setcommenterror(error.response.data);
              }
            })
        : setcommenterror("Reply cannot be empty")
      : setcommenterror("You must be logged in to write a reply");
  };
  return (
    <>
      {LikeError && (
        <ErrorAlert
          alertText={"You must be logged in to like this post"}
          setError={setLikeError}
        />
      )}

      {comments
        .map((value) => {
          return (
            <>
              <div key={value.id} className="ShowComments">
                <div className="left">
                  <img
                    onClick={() => history.push(`/Profile/${value.name}`)}
                    loading="lazy"
                    className="profileImage"
                    src={value.Image}
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className="header">
                    <div className="headerLeft">
                      <div
                        onClick={() => history.push(`/Profile/${value.name}`)}
                        className="username"
                      >
                        <p>{value.name}</p>
                        {value.verified && (
                          <MdVerified color="green" size={14} />
                        )}
                      </div>
                      <div className="date">
                        {" "}
                        {moment(value.createdAt).format("MMMM Do") ===
                        moment(new Date()).format("MMMM Do")
                          ? moment(value.createdAt).fromNow()
                          : moment(value.createdAt).format("M/D/YY")}
                      </div>
                    </div>
                    <div className="headerRight">
                      <CommentMenu
                        Username={value.name}
                        postId={value.id}
                        setComments={setComments}
                        reply={false}
                      />
                    </div>
                  </div>

                  <div className="postText"> {value.replyText}</div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpened(true);
                      setreplyingto(value.name);
                      setcommentid(value.id);
                    }}
                    className="replyButton"
                  >
                    reply
                  </div>
                </div>
              </div>
              {value.NestedComments.map((val) => {
                return (
                  <div key={val.id} className="NestedComments">
                    <div className="left">
                      <img
                        onClick={() => history.push(`/Profile/${val.name}`)}
                        loading="lazy"
                        className="profileImage"
                        src={val.profileImage}
                        alt=""
                      />
                    </div>
                    <div className="right">
                      <div className="header">
                        <div className="headerLeft">
                          <div
                            onClick={() => history.push(`/Profile/${val.name}`)}
                            className="username"
                          >
                            <p>{val.name} </p>
                            {val.verified && (
                              <MdVerified color="green" size={14} />
                            )}
                          </div>
                          <div className="date">
                            {" "}
                            {moment(val.createdAt).format("MMMM Do") ===
                            moment(new Date()).format("MMMM Do")
                              ? moment(val.createdAt).fromNow()
                              : moment(val.createdAt).format("M/D/YY")}
                          </div>
                        </div>
                        <div className="headerRight">
                          <CommentMenu
                            Username={val.name}
                            postId={val.id}
                            setComments={setComments}
                            reply={true}
                            setdeleting={setdeleting}
                          />
                        </div>
                      </div>
                      <p
                        style={{
                          color: "grey",
                          fontWeight: "normal",
                          fontSize: "14px",
                        }}
                      >
                        Replying to{" "}
                        <span
                          onClick={() =>
                            history.push(`/Profile/${val.repliedTo}`)
                          }
                          style={{ color: "black", cursor: "pointer" }}
                        >
                          {val.repliedTo}
                        </span>
                      </p>

                      <div className="postText"> {val.replyText}</div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setOpened(true);
                          setreplyingto(val.name);
                          setcommentid(value.id);
                        }}
                        className="replyButton"
                      >
                        reply
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          );
        })
        .reverse()}
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={() => {
          closeFunc();
        }}
      >
        <p style={{ fontSize: "14px", color: "red" }}> {commenterror}</p>
        <Textarea
          value={text}
          label={`Replying to ${replyingto}`}
          onChange={(e) => settext(e.target.value)}
          placeholder="Write something"
          required
        />

        <div
          style={{
            paddingTop: "15px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button onClick={() => commentreply()} size="xs">
            Reply
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ShowComments;
