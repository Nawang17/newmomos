import { useState, useEffect, useContext } from "react";
import Posts from "../Components/Posts";
import { UserContext } from "../context/User";
import "../styles/Comments.css";
import { useParams } from "react-router";
import { getComments } from "../apiEndpoints/apiEndpoints";
import { ErrorAlert } from "../Components/ErrorAlert";
import CommentInput from "../Components/CommentInput";
import ShowComments from "../Components/ShowComments";
import { Loader } from "@mantine/core";

const Comment = () => {
  const { setpath } = useContext(UserContext);
  const { username, postid } = useParams();
  const [posts, setPosts] = useState([]);
  const [LikedPosts, setLikedPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [comments, setComments] = useState([]);
  const [LoadError, setLoadError] = useState(false);
  const [newComment, setNewComment] = useState(false);

  useEffect(() => {
    console.log("afwa");
    setloading(true);
    setpath("Comment");
    getComments(username, postid)
      .then((res) => {
        setPosts(res.data.singlePosts);
        setComments(res.data.singlePosts[0].Comments);
        setLikedPosts(res.data.likedPosts);
        setloading(false);
      })
      .catch((err) => {
        seterror(err.message);
        setLoadError(true);
      });
  }, [setpath, username, postid, newComment]);
  return (
    <>
      {LoadError && <ErrorAlert alertText={error} setError={setLoadError} />}
      {!loading ? (
        <div className="Comment">
          <Posts
            posts={posts}
            setPosts={setPosts}
            setLikePosts={setLikedPosts}
            LikedPosts={LikedPosts}
            loading={loading}
          />
          <CommentInput setNewComment={setNewComment} />
          <ShowComments comments={comments} />
        </div>
      ) : (
        <div className="Comment">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "40px 0px",
            }}
          >
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
