import React from "react";
import "../styles/Topnav.css";
const Topnav = () => {
  return (
    <div className="topnav">
      <div className="logo">momos</div>
      <div className="topnavright">
        <img
          loading="lazy"
          className="profileimg"
          src="https://res.cloudinary.com/dwzjfylgh/image/upload/v1648215217/dd23namcxikmc35qewa2.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Topnav;
