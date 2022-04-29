import React from "react";
import { Bell, Home, MessageCircle2 } from "tabler-icons-react";
import "../styles/Bottomnav.css";
import { useHistory } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import { UserContext } from "../context/User";

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
          <Home />
        </div>
        <div className="navItem">
          <MessageCircle2 />
        </div>
        <div onClick={() => history.push("/Notifications")} className="navItem">
          <Bell />
        </div>
        <div className="navItem">
          <BurgerMenu />
        </div>
      </div>
    </div>
  );
};

export default Bottomnav;
