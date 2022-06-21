import { useState, useEffect, useContext } from "react";
import "../styles/Topnav.css";
import { ArrowNarrowLeft } from "tabler-icons-react";
import ProfileDrawer from "./ProfileDrawer";
import { UserContext } from "../context/User";
import Login from "./Login";
import { useHistory } from "react-router-dom";
import { Socketint } from "../functions/Socketint";
const Topnav = () => {
  const history = useHistory();
  const currentpath = window.location.pathname;
  const [mobile, setmobile] = useState(false);
  const { UserInfo, path } = useContext(UserContext);
  useEffect(() => {
    if (window.screen.width < 600) {
      setmobile(true);
    }
  }, [currentpath]);
  return (
    <div className="topnav">
      <div className="logo">
        {currentpath !== "/" && (
          <ArrowNarrowLeft
            onClick={() => {
              // if (currentpath.split("/")[1] === "Message") {
              //   console.log("clicked");
              //   socket.emit("leaveroom", {
              //     username: UserInfo.userName,
              //     room: parseInt(currentpath.split("/")[3]),
              //   });
              // }

              history.goBack();
            }}
            size={26}
          />
        )}

        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            path === "momos" && history.push("/");
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
