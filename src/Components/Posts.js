import { useContext, useState } from "react";
import { Message2 } from "tabler-icons-react";
import "../styles/Posts.css";
import PostMenu from "./PostMenu";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User";
import { LikePost } from "../functions/LikePost";
import moment from "moment";
import { MdVerified } from "react-icons/md";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { Modal } from "@mantine/core";
const Posts = ({ posts, LikedPosts, setPosts, setLikePosts }) => {
  const { UserInfo, setError, setErrorMessage } = useContext(UserContext);
  const history = useHistory();
  const [opened, setOpened] = useState(false);
  const [modalimg, setmodalimg] = useState("");

  return (
    <>
      {posts.map((value) => {
        return (
          <div key={value.id} className="Posts">
            <div className="left">
              <img
                onClick={() => history.push(`/Profile/${value.Username}`)}
                loading="lazy"
                className="profileImage"
                src={value.image}
                alt=""
              />
            </div>
            <div className="right">
              <div className="header">
                <div className="headerLeft">
                  <div
                    onClick={() => history.push(`/Profile/${value.Username}`)}
                    className="username"
                  >
                    <p>{value.Username}</p>
                    {value.verified && <MdVerified color="green" size={14} />}
                  </div>
                  <div className="date">
                    {moment(value.createdAt).format("MMMM Do") ===
                    moment(new Date()).format("MMMM Do")
                      ? moment(value.createdAt).fromNow()
                      : moment(value.createdAt).format("M/D/YY")}
                  </div>
                </div>
                <div className="headerRight">
                  <PostMenu
                    Username={value.Username}
                    postId={value.id}
                    setPosts={setPosts}
                  />
                </div>
              </div>

              <div className="postText">{value.postText}</div>
              {value.postImage && (
                <div
                  onClick={() => {
                    setmodalimg(value.postImage);
                    setOpened(true);
                  }}
                  className="postImagediv"
                >
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
                  onClick={() => {
                    LikePost(
                      value.id,
                      value.Username,
                      LikedPosts,
                      posts,
                      setPosts,
                      setLikePosts,
                      UserInfo.loginStatus,
                      setError,
                      setErrorMessage
                    );
                    setTimeout(() => {
                      setError(false);
                    }, "7000");
                  }}
                  className={
                    LikedPosts.includes(value.id) ? "LikesActive" : "Likes"
                  }
                >
                  {LikedPosts.includes(value.id) ? (
                    <RiHeart3Fill className="LikeLogo" size={20} />
                  ) : (
                    <RiHeart3Line className="LikeLogo" size={20} />
                  )}

                  <div className="likeCount">{value.Likes.length}</div>
                </div>
                <div
                  onClick={() => {
                    history.push(`/Post/${value.Username}/${value.id}`);
                  }}
                  className="Comments"
                >
                  <Message2 className="CommentLogo" size={20} />
                  <div className="CommentCount">{value.Comments.length}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Modal
        padding={0}
        size="lg"
        withCloseButton={false}
        opened={opened}
        onClose={() => {
          setOpened(false);
          setmodalimg("");
        }}
      >
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
          <img
            loading="lazy"
            style={{ width: "100%", height: "auto" }}
            src={modalimg}
            alt=""
          />
        </div>
      </Modal>
    </>
  );
};

export default Posts;
