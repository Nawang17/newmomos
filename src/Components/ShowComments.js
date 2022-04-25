import { useState, useContext } from "react";
import "../styles/ShowComment.css";
import PostMenu from "./PostMenu";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User";
import { ErrorAlert } from "./ErrorAlert";
import moment from "moment";
const ShowComments = ({ comments }) => {
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

      {comments.map((value) => {
        return (
          <>
            <div key={value.id} className="ShowComments">
              <div className="left">
                <img
                  loading="lazy"
                  className="profileImage"
                  src={value.Image}
                  alt=""
                />
              </div>
              <div className="right">
                <div className="header">
                  <div className="headerLeft">
                    <div className="username">
                      <p>{value.name}</p>
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
                    <PostMenu />
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
                      loading="lazy"
                      className="profileImage"
                      src={val.profileImage}
                      alt=""
                    />
                  </div>
                  <div className="right">
                    <div className="header">
                      <div className="headerLeft">
                        <div className="username">
                          <p>{val.name}</p>
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
                        <PostMenu />
                      </div>
                    </div>

                    <div className="postText"> {val.replyText}</div>
                    <div className="replyButton">reply</div>
                  </div>
                </div>
              );
            })}
          </>
        );
      })}
    </>
  );
};

export default ShowComments;
