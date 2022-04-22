import React from "react";
import "../styles/Topnav.css";
import { Motorbike } from "tabler-icons-react";
import ProfileDrawer from "./ProfileDrawer";
const Topnav = () => {
  return (
    <div className="topnav">
      <div className="logo">
        <Motorbike size={26} />
        <p>momos</p>
      </div>
      <div className="topnavright">
        <ProfileDrawer />
      </div>
    </div>
  );
};

export default Topnav;
