import React from "react";
import { Bike, Bell, Logout, Mail } from "tabler-icons-react";
import { Modal, Button } from "@mantine/core";
import "../styles/LeftContainer.css";
import { AiOutlineHome } from "react-icons/ai";
import Login from "./Login";
import { UserContext } from "../context/User";
import { useHistory } from "react-router-dom";
import { LogoutUser } from "../functions/Logout";
import NewPosts from "./NewPosts";
import { SiFoodpanda } from "react-icons/si";
const LeftContainer = () => {
  const { UserInfo, setUserInfo, path } = React.useContext(UserContext);
  const history = useHistory();
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <div className="LeftContainer">
        <div className="leftheader">
          <SiFoodpanda size={20} />
        </div>
        <div className="lnavItems">
          <div
            onClick={() => {
              path === "momos"
                ? window.scrollTo({ top: 0, behavior: "smooth" })
                : history.push("/home");

              history.push("/");
            }}
            className="lnavItem"
          >
            <div className="lnavIcon">
              <AiOutlineHome size={26} />
            </div>
            <div className="lnavText">Home</div>
          </div>

          <NewPosts />
          <div onClick={() => history.push("/Messages")} className="lnavItem">
            <div className="lnavIcon">
              <Mail size={26} />
            </div>
            <div className="lnavText">Messages</div>
          </div>
          <div
            onClick={() => history.push("/Notifications")}
            className="lnavItem"
          >
            <div className="lnavIcon">
              <Bell size={26} />
            </div>
            <div className="lnavText">Notifications</div>
          </div>

          {UserInfo.loginStatus ? (
            <div
              onClick={() => {
                history.push(`/Profile/${UserInfo.userName}`);
              }}
              className="lnavItem"
            >
              <div className="lnavIcon">
                <img src={UserInfo.image} alt="profile" />
              </div>

              <div className="lnavText">{UserInfo.userName}</div>
            </div>
          ) : (
            <div className="lnavItem">
              <div style={{ justifyContent: "center" }}>
                <Login />
              </div>
            </div>
          )}
          {UserInfo.loginStatus && (
            <div
              onClick={() => {
                setModalOpen(true);
              }}
              className="lnavItem"
            >
              <div className="lnavIcon">
                <Logout size={26} />
              </div>
              <div className="lnavText">Logout</div>
            </div>
          )}
        </div>
      </div>
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

export default LeftContainer;
