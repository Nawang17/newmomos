import React from "react";
import { Heart, Home, Menu, MessageCircle2, Plus } from "tabler-icons-react";
import "../styles/Bottomnav.css";
const Bottomnav = () => {
  return (
    <div className="Bottomnav">
      <div className="navItems">
        <div className="navItem">
          <Home size={26} />
        </div>
        <div className="navItem">
          <MessageCircle2 size={26} />{" "}
        </div>
        <div className="navItem">
          <Plus size={26} />
        </div>
        <div className="navItem">
          <Heart size={26} />
        </div>
        <div className="navItem">
          <Menu size={26} />
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;
