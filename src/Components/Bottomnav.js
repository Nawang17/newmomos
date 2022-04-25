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
          <Home size={26} />
        </div>
        <div className="navItem">
          <MessageCircle2 size={26} />
        </div>
        <div onClick={() => history.push("/Notifications")} className="navItem">
          <Bell size={26} />
        </div>
        <div className="navItem">
          <Menu size={26} />
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;
