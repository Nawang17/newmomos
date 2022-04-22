import { useState } from "react";
import { Drawer } from "@mantine/core";
import "../styles/Drawer.css";
import { Settings, User, Logout } from "tabler-icons-react";
const ProfileDrawer = () => {
  const [opened, setOpened] = useState(false);
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
          <img
            src="https://res.cloudinary.com/dwzjfylgh/image/upload/v1648215217/dd23namcxikmc35qewa2.jpg"
            alt=""
          />
          <p>katoph</p>
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
          <div className="menuItem">
            <Logout size={26} />
            <p>Logout</p>
          </div>
        </div>
      </Drawer>
      <img
        onClick={() => setOpened(true)}
        loading="lazy"
        className="profileimg"
        src="https://res.cloudinary.com/dwzjfylgh/image/upload/v1648215217/dd23namcxikmc35qewa2.jpg"
        alt=""
      />
    </>
  );
};

export default ProfileDrawer;
