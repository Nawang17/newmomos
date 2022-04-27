import { useState, useEffect, useContext } from "react";
import ProfileHeader from "../Components/ProfileHeader";
import { UserContext } from "../context/User";
import "../styles/Profile.css";
import { Heart, Inbox } from "tabler-icons-react";
import { Loader, Tabs } from "@mantine/core";

import axios from "axios";
import { useParams } from "react-router-dom";
import Posts from "../Components/Posts";
const Profile = () => {
  const {
    setpath,
    UserInfo,
    setError,
    setErrorMessage,
    following,
    setFollowing,
  } = useContext(UserContext);
  const { username } = useParams();
  const [profileInfo, setprofileInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const [postResultsCount, setpostcount] = useState(0);
  const [loading, setloading] = useState(true);
  const [LikedPosts, setLikePosts] = useState([]);
  const [userLikedPosts, setUserLikePosts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setpath("Profile");
    setActiveTab(0);
    setloading(true);
    axios
      .get(
        `https://momofirstapi.herokuapp.com/Profile/getProfile/${username}?page=0`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setprofileInfo(res.data.UserInfo);
        setPosts(res.data.UserPosts);
        setLikePosts(res.data.likedPosts);
        setpostcount(res.data.postCount);
        setUserLikePosts(res.data.listOfuserlikedPosts);
        setloading(false);
      });
  }, [setpath, username]);
  return (
    <div className="Profile">
      {!loading ? (
        <>
          <ProfileHeader
            setError={setError}
            setErrorMessage={setErrorMessage}
            UserInfo={UserInfo}
            profileInfo={profileInfo}
            Following={following}
            setFollowing={setFollowing}
          />
          <Tabs active={activeTab} onTabChange={setActiveTab}>
            <Tabs.Tab label="Posts" icon={<Inbox size={14} />}>
              <Posts
                posts={posts}
                setPosts={setPosts}
                postResultsCount={postResultsCount}
                setLikePosts={setLikePosts}
                LikedPosts={LikedPosts}
                loading={loading}
              />
            </Tabs.Tab>
            <Tabs.Tab label="Likes" icon={<Heart size={14} />}>
              <Posts
                posts={userLikedPosts}
                setPosts={setUserLikePosts}
                postResultsCount={postResultsCount}
                setLikePosts={setLikePosts}
                LikedPosts={LikedPosts}
                loading={loading}
              />
            </Tabs.Tab>
          </Tabs>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 0px",
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Profile;
