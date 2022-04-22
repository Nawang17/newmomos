import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "../Components/Posts";
import "../styles/Home.css";
import { loadMoreposts } from "../functions/loadMoreposts";
const Home = () => {
  const [loading, setloading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [postResultsCount, setpostResultsCount] = useState(0);
  const [LikedPosts, setLikePosts] = useState([]);
  useEffect(() => {
    setloading(true);
    axios
      .get("https://momofirstapi.herokuapp.com/Post/getPosts?page=0", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setPosts(res.data.listOfPosts);
        setLikePosts(res.data.likedPosts);
        setpostResultsCount(res.data.postCount);
        setloading(false);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {!loading ? (
        <div className="Home">
          <Posts
            posts={posts}
            postResultsCount={postResultsCount}
            LikedPosts={LikedPosts}
          />
          {posts.length < postResultsCount && (
            <div
              onClick={() => {
                setPageCount((prev) => prev + 1);
                loadMoreposts(pageCount, setPosts);
              }}
              className="loadMore"
            >
              Load more posts
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Home;
