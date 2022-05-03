import React from "react";
import "../styles/Topnav.css";
import { ArrowNarrowLeft } from "tabler-icons-react";
import ProfileDrawer from "./ProfileDrawer";
import { UserContext } from "../context/User";
import Login from "./Login";
import { useHistory } from "react-router-dom";
const Topnav = () => {
  const history = useHistory();
  const currentpath = window.location.pathname;
  const [mobile, setmobile] = React.useState(false);
  const { UserInfo, path } = React.useContext(UserContext);

  React.useEffect(() => {
    if (window.screen.width < 600) {
      setmobile(true);
    }
  }, []);
  return (
    <div className="topnav">
      <div className="logo">
        {currentpath !== "/" && (
          <ArrowNarrowLeft onClick={() => history.goBack()} size={26} />
        )}

        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            path === "momos" && history.push("/About");
          }}
        >
          {path}
        </p>
      </div>
      {mobile && (
        <div className="topnavright">
          {currentpath === "/" ? (
            UserInfo.loginStatus ? (
              <ProfileDrawer />
            ) : (
              <Login />
            )
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Topnav;
