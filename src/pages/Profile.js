import { useState, useEffect, useContext } from "react";
import ProfileHeader from "../Components/ProfileHeader";
import { UserContext } from "../context/User";
import "../styles/Profile.css";
const Profile = () => {
  const { UserInfo, setpath } = useContext(UserContext);

  useEffect(() => {
    setpath("Profile");
  }, []);
  return (
    <div className="Profile">
      <ProfileHeader />
    </div>
  );
};

export default Profile;
