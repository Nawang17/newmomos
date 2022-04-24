import React from "react";
import "../styles/Topnav.css";
import { ArrowNarrowLeft, Motorbike } from "tabler-icons-react";
import ProfileDrawer from "./ProfileDrawer";
import { UserContext } from "../context/User";
import Login from "./Login";
import { useHistory } from "react-router-dom";
const Topnav = () => {
  const history = useHistory();
  const currentpath = window.location.pathname;
  const { UserInfo, path } = React.useContext(UserContext);

  return (
    <div className="topnav">
      <div className="logo">
        {currentpath === "/" ? (
          <Motorbike size={26} />
        ) : (
          <ArrowNarrowLeft onClick={() => history.goBack()} size={26} />
        )}

        <p>{path}</p>
      </div>
      <div className="topnavright">
        {currentpath === "/" ? (
          UserInfo.loginStatus ? (
            <ProfileDrawer />
          ) : (
            <Login />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Topnav;
