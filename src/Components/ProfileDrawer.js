import { useState, useContext } from "react";
import { Drawer } from "@mantine/core";
import "../styles/Drawer.css";
import { Settings, User, Logout } from "tabler-icons-react";
import { UserContext } from "../context/User";
import { LogoutUser } from "../functions/Logout";
const ProfileDrawer = () => {
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
          <div className="menuItem">
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
      <img
        onClick={() => setOpened(true)}
        loading="lazy"
        className="profileimg"
        src={UserInfo.image}
        alt=""
      />
    </>
  );
};

export default ProfileDrawer;
