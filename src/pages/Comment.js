import { useState, useEffect, useContext } from "react";
import Posts from "../Components/Posts";
import { UserContext } from "../context/User";
import "../styles/Comments.css";
import { useParams } from "react-router";
import { getComments } from "../apiEndpoints/apiEndpoints";
const Comment = () => {
  const { setpath } = useContext(UserContext);
  const { username, postid } = useParams();
  const [posts, setPosts] = useState([]);
  const [LikedPosts, setLikedPosts] = useState([]);
  const [loading, setloading] = useState(false);

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
        alert(err);
      });
  }, [setpath, username, postid]);
  return (
    <div className="Comment">
      <Posts
        posts={posts}
        setPosts={setPosts}
        setLikePosts={setLikedPosts}
        LikedPosts={LikedPosts}
        loading={loading}
      />
    </div>
  );
};

export default Comment;
