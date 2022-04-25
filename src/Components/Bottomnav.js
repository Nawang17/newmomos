import React from "react";
import { Bell, Home, Menu, MessageCircle2, Plus } from "tabler-icons-react";
import "../styles/Bottomnav.css";
import { useHistory } from "react-router-dom";
const Bottomnav = () => {
  const history = useHistory();
  return (
    <div className="Bottomnav">
      <div className="navItems">
        <div onClick={() => history.push("/")} className="navItem">
          <Home />
        </div>
        <div className="navItem">
          <MessageCircle2 />
        </div>
        <div onClick={() => history.push("/Notifications")} className="navItem">
          <Bell />
        </div>
        <div className="navItem">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;
