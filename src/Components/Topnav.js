import React from "react";
import "../styles/Topnav.css";
import { Motorbike } from "tabler-icons-react";
import ProfileDrawer from "./ProfileDrawer";
import { UserContext } from "../context/User";
import axios from "axios";
import Login from "./Login";
const Topnav = () => {
  const { UserInfo, setUserInfo } = React.useContext(UserContext);
  const demoLogin = () => {
    axios
      .post("https://momofirstapi.herokuapp.com/LoginUsers/login", {
        Username: "Demo",
        Password: "Demo",
      })
      .then((res) => {
        setUserInfo({
          userName: res.data.Username,
          image: res.data.Image,
          loginStatus: true,
          accessToken: res.data.token,
          verified: res.data.verified,
        });
        localStorage.setItem("accessToken", res.data.token);
      });
  };
  return (
    <div className="topnav">
      <div className="logo">
        <Motorbike size={26} />
        <p>momos</p>
      </div>
      <div className="topnavright">
        {UserInfo.loginStatus ? <ProfileDrawer /> : <Login />}
      </div>
    </div>
  );
};

export default Topnav;
