import React from "react";
import "../styles/Bottomnav.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/User";
import { RiHeart3Line } from "react-icons/ri";
import { GrHomeRounded } from "react-icons/gr";
import { HiMenuAlt4 } from "react-icons/hi";
import { Mail } from "tabler-icons-react";
const Bottomnav = () => {
  const { path } = React.useContext(UserContext);
  const history = useHistory();
  return (
    <div className="Bottomnav">
      <div className="navItems">
        <div
          onClick={() => {
            path === "momos"
              ? window.scrollTo({ top: 0, behavior: "smooth" })
              : history.push("/home");

            history.push("/");
          }}
          className="navItem"
        >
          <GrHomeRounded size={18} />
        </div>

        <div onClick={() => history.push("/Notifications")} className="navItem">
          <RiHeart3Line size={22} />
        </div>

        <div
          onClick={() => {
            history.push("/About");
          }}
          className="navItem"
        >
          <HiMenuAlt4 size={22} />
        </div>
        {/* <div
          onClick={() => {
            history.push("/Messages");
          }}
          className="navItem"
        >
          <Mail size={22} />
        </div> */}
      </div>
    </div>
  );
};

export default Bottomnav;
