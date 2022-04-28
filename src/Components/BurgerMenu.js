import { useState, useContext } from "react";
import { Drawer } from "@mantine/core";
import "../styles/Drawer.css";
import { User, Logout, Menu } from "tabler-icons-react";
import { UserContext } from "../context/User";
import { LogoutUser } from "../functions/Logout";
import Login from "./Login";
import { Modal, Button } from "@mantine/core";

import { BsFillPersonPlusFill } from "react-icons/bs";

import { useHistory } from "react-router-dom";
import RegisterModal from "./RegisterModal";
const BurgerMenu = () => {
  const history = useHistory();
  const [opened, setOpened] = useState(false);
  const { UserInfo, setUserInfo } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

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
              {/* <div className="menuItem">
                <Settings size={26} />
                <p>Settings</p>
              </div> */}
              <div onClick={() => setModalOpen(true)} className="menuItem">
                <Logout size={26} />
                <p>Logout</p>
              </div>{" "}
            </div>
          </>
        ) : (
          <>
            <div className="menu">
              <div className="menuItem">
                <Login />
                <p>Login</p>
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
      <Menu
        onClick={() => {
          UserInfo.loginStatus && setOpened(true);
        }}
      />
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Logout"
      >
        <p>Are you sure you want to Logout?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            paddingTop: "10px",
          }}
        >
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button
            color="red"
            onClick={() => {
              LogoutUser(setUserInfo);

              setModalOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default BurgerMenu;
