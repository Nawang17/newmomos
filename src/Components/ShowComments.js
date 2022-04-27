import { useState, useContext } from "react";
import "../styles/ShowComment.css";
import PostMenu from "./PostMenu";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User";
import { ErrorAlert } from "./ErrorAlert";
import moment from "moment";
import { MdVerified } from "react-icons/md";
import CommentMenu from "./CommentMenu";

const ShowComments = ({ comments, setComments }) => {
  const [LikeError, setLikeError] = useState(false);
  const { UserInfo } = useContext(UserContext);
  const history = useHistory();
  return (
    <>
      {LikeError && (
        <ErrorAlert
          alertText={"Please login to like this post"}
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
                      />
                    </div>
                  </div>

                  <div className="postText"> {value.replyText}</div>
                  <div className="replyButton">reply</div>
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
                            Username={value.name}
                            postId={value.id}
                            setComments={setComments}
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
                        <strong
                          onClick={() =>
                            history.push(`/Profile/${val.repliedTo}`)
                          }
                          style={{ color: "black", cursor: "pointer" }}
                        >
                          {val.repliedTo}
                        </strong>
                      </p>

                      <div className="postText"> {val.replyText}</div>
                      <div className="replyButton">reply</div>
                    </div>
                  </div>
                );
              })}
            </>
          );
        })
        .reverse()}
    </>
  );
};

export default ShowComments;
