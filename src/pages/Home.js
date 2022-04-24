import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Posts from "../Components/Posts";
import "../styles/Home.css";

import { UserContext } from "../context/User";
import { getHomePosts, loadMoreposts } from "../apiEndpoints/apiEndpoints";
import { ErrorAlert } from "../Components/ErrorAlert";
const Home = () => {
  const { UserInfo, setpath } = useContext(UserContext);
  const [loading, setloading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [postResultsCount, setpostResultsCount] = useState(0);
  const [error, seterror] = useState(false);
  const [LoadError, setLoadError] = useState(false);
  const [LikedPosts, setLikePosts] = useState([]);

  useEffect(() => {
    setpath("momos");
    setloading(true);

    getHomePosts()
      .then((res) => {
        setPosts(res.data.listOfPosts);
        setLikePosts(res.data.likedPosts);
        setpostResultsCount(res.data.postCount);
        setloading(false);
      })
      .catch((err) => {
        seterror(err.message);
        setLoadError(true);
      });
  }, [setpath]);

  return (
    <>
      {LoadError && <ErrorAlert alertText={error} setError={setLoadError} />}
      {!loading ? (
        <div className="Home">
          <Posts
            posts={posts}
            setPosts={setPosts}
            postResultsCount={postResultsCount}
            setLikePosts={setLikePosts}
            LikedPosts={LikedPosts}
            loading={loading}
          />
          {posts.length < postResultsCount && (
            <div
              onClick={() => {
                setPageCount((prev) => prev + 1);
                loadMoreposts(pageCount, setPosts, seterror, setLoadError);
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
