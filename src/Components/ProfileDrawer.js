import { useState, useContext, useEffect } from "react";
import { Drawer } from "@mantine/core";
import "../styles/Drawer.css";
import { Settings, User, Logout } from "tabler-icons-react";
import { UserContext } from "../context/User";
import { LogoutUser } from "../functions/Logout";
import { useHistory } from "react-router-dom";
const ProfileDrawer = () => {
  const history = useHistory();
  const [opened, setOpened] = useState(false);
  const { UserInfo, setUserInfo } = useContext(UserContext);

  return (
    <>
      <Drawer
        position="right"
        opened={opened}
        onClose={() => setOpened(false)}
        padding="md"
        size="md"
      >
        <div className="profile">
          <img src={UserInfo.image} alt="" />
          <p>{UserInfo.userName}</p>
        </div>
        <div className="menu">
          <div
            onClick={() => history.push(`/Profile/${UserInfo.userName}`)}
            className="menuItem"
          >
            <User size={26} />
            <p>Profile</p>
          </div>
          <div className="menuItem">
            <Settings size={26} />
            <p>Settings</p>
          </div>
          <div onClick={() => LogoutUser(setUserInfo)} className="menuItem">
            <Logout size={26} />
            <p>Logout</p>
          </div>
        </div>
      </Drawer>
      <div
        className="profile-icon"
        onClick={() => setOpened(true)}
        style={{ padding: "0px 10px" }}
      >
        <img
          loading="lazy"
          className="profileimg"
          src={UserInfo.image}
          alt=""
        />
      </div>
    </>
  );
};

export default ProfileDrawer;
