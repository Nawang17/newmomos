import { useState, useEffect, useContext } from "react";
import Posts from "../Components/Posts";
import { UserContext } from "../context/User";
import "../styles/Comments.css";
import { useParams } from "react-router";
import { getComments } from "../apiEndpoints/apiEndpoints";
import { ErrorAlert } from "../Components/ErrorAlert";

const Comment = () => {
  const { setpath } = useContext(UserContext);
  const { username, postid } = useParams();
  const [posts, setPosts] = useState([]);
  const [LikedPosts, setLikedPosts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [LoadError, setLoadError] = useState(false);
  useEffect(() => {
    console.log("afwa");
    setloading(true);
    setpath("Comment");
    getComments(username, postid)
      .then((res) => {
        setPosts(res.data.singlePosts);
        setLikedPosts(res.data.likedPosts);
        setloading(false);
      })
      .catch((err) => {
        seterror(err.message);
        setLoadError(true);
      });
  }, [setpath, username, postid]);
  return (
    <>
      {LoadError && <ErrorAlert alertText={error} setError={setLoadError} />}

      <div className="Comment">
        <Posts
          posts={posts}
          setPosts={setPosts}
          setLikePosts={setLikedPosts}
          LikedPosts={LikedPosts}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Comment;
