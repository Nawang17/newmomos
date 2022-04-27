import { useState, useContext } from "react";
import { Drawer } from "@mantine/core";
import "../styles/Drawer.css";
import { Settings, User, Logout, Menu, Moon } from "tabler-icons-react";
import { UserContext } from "../context/User";
import { LogoutUser } from "../functions/Logout";
import Login from "./Login";
import { BsFillPersonPlusFill } from "react-icons/bs";

import { HiOutlineLogin } from "react-icons/hi";

import { useHistory } from "react-router-dom";
import RegisterModal from "./RegisterModal";
const BurgerMenu = () => {
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
        {UserInfo.loginStatus ? (
          <>
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
              </div>{" "}
            </div>
          </>
        ) : (
          <>
            <div className="menu">
              <div className="menuItem">
                <HiOutlineLogin size={28} />

                <Login />
              </div>
              <div className="menuItem">
                <BsFillPersonPlusFill size={28} />

                <RegisterModal />
              </div>
              {/* <div className="menuItem">
                <Moon size={26} />
                <p>NightMode</p>
              </div> */}
            </div>
          </>
        )}
      </Drawer>
      <Menu onClick={() => setOpened(true)} />
    </>
  );
};

export default BurgerMenu;
