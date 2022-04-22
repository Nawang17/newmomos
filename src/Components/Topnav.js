import React from "react";
import "../styles/Topnav.css";
const Topnav = () => {
  return (
    <div className="topnav">
      <div className="logo">Momos</div>
      <div className="topnavright">
        <img
          loading="lazy"
          className="profileimg"
          src="https://ui-avatars.com/api/?background=008AB8&color=fff&name=g&size=128"
          alt=""
        />
      </div>
    </div>
  );
};

export default Topnav;
