import { useState, useContext } from "react";
import { Heart, Message2 } from "tabler-icons-react";
import "../styles/Posts.css";
import PostMenu from "./PostMenu";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User";
import { LikePost } from "../functions/LikePost";
import { ErrorAlert } from "./ErrorAlert";

const Posts = ({ posts, LikedPosts, setPosts, setLikePosts }) => {
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

      {posts.map((value) => {
        return (
          <div key={value.id} className="Posts">
            <div className="left">
              <img
                loading="lazy"
                className="profileImage"
                src={value.image}
                alt=""
              />
            </div>
            <div className="right">
              <div className="header">
                <div className="headerLeft">
                  <div className="username">
                    <p>{value.Username}</p>
                  </div>
                  <div className="date">4/22/2022</div>
                </div>
                <div className="headerRight">
                  <PostMenu />
                </div>
              </div>

              <div className="postText">{value.postText}</div>
              {value.postImage && (
                <div className="postImagediv">
                  <img
                    loading="lazy"
                    className="postImage"
                    src={value.postImage}
                    alt=""
                  />
                </div>
              )}
              <div className="postInsight">
                <div
                  onClick={() =>
                    LikePost(
                      value.id,
                      value.Username,
                      LikedPosts,
                      posts,
                      setPosts,
                      setLikePosts,
                      UserInfo.loginStatus,
                      setLikeError
                    )
                  }
                  className={
                    LikedPosts.includes(value.id) ? "LikesActive" : "Likes"
                  }
                >
                  <Heart
                    fill={LikedPosts.includes(value.id) ? "red" : "none"}
                    className="LikeLogo"
                    size={22}
                  />
                  <div className="likeCount">{value.Likes.length}</div>
                </div>
                <div
                  onClick={() => {
                    history.push(`/${value.Username}/${value.id}`);
                  }}
                  className="Comments"
                >
                  <Message2 className="CommentLogo" size={22} />
                  <div className="CommentCount">{value.Comments.length}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
