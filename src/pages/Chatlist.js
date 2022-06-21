import { UserContext } from "../context/User";
import { useEffect, useContext, useState } from "react";
import "../styles/Chats.css";
import { useHistory } from "react-router-dom";
import { Socketint } from "../functions/Socketint";
import axios from "axios";
import moment from "moment";
import { Button } from "@mantine/core";
import { RiMailAddLine } from "react-icons/ri";
import { Modal, Input } from "@mantine/core";

const Chatlist = () => {
  const [opened, setOpened] = useState(false);

  const [roomarray, setRoomarray] = useState([]);
  const [userarr, setuserarr] = useState([]);
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);
  const [chat, setChat] = useState([]);
  const socket = Socketint;
  const history = useHistory();
  const { setpath, UserInfo } = useContext(UserContext);
  const [newroom, setNewroom] = useState(false);
  useEffect(() => {
    setsearch("");
    if (UserInfo.loginStatus) {
      axios
        .get(`https://momofirstapi.herokuapp.com/Room/getRooms`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          console.log(res.data.rooms);
          setChat(res.data.rooms);
          socket.emit("joinroom", {
            username: UserInfo.userName,
            room: res.data.roomarr,
          });
          setuserarr(res.data.userarr);
          setRoomarray(res.data.roomarr);
        });
      axios
        .get("https://momofirstapi.herokuapp.com/Room/users")
        .then((response) => {
          setusers(response.data.users);
          console.log(response.data.users);
        });
    } else {
      history.push("/");
    }

    setpath("Messages");
  }, [newroom]);
  return (
    <>
      {UserInfo.loginStatus ? (
        <div className="Chats">
          <div style={{ padding: "10px 15px" }}>
            <Button
              onClick={() => {
                setusers((prev) => {
                  return prev.filter(
                    (user) =>
                      userarr.includes(user.Username) === false &&
                      user.Username !== UserInfo.userName
                  );
                });
                setOpened(!opened);
              }}
              variant="Light"
              style={{
                width: "100%",
              }}
              leftIcon={<RiMailAddLine size={14} />}
            >
              New message
            </Button>
          </div>
          {chat.map((val, id) => {
            return (
              <div
                key={val.id}
                onClick={() => {
                  history.push({
                    pathname: `/Message/${
                      val.user1info.Username === UserInfo.userName
                        ? val.user2info.Username
                        : val.user1info.Username
                    }/${val.id}`,
                    state: {
                      messages: val.Messages,
                    },
                  });
                }}
                className="Chat"
              >
                <img
                  src={
                    val.user1info.Username === UserInfo.userName
                      ? val.user2info.Image
                      : val.user1info.Image
                  }
                  alt=""
                />
                <div className="ChatRight">
                  <div className="ChatRightTop">
                    <div className="chatuser">
                      {val.user1info.Username === UserInfo.userName
                        ? val.user2info.Username
                        : val.user1info.Username}
                    </div>
                    <div className="chatdate">
                      {val.Messages.length > 0
                        ? moment(val.Messages.slice(-1)[0].createdAt).format(
                            "M/D/YY"
                          )
                        : ""}
                    </div>
                  </div>
                  <div className="ChatRightBottom">
                    {val.Messages.length > 0
                      ? val.Messages.slice(-1)[0].message
                      : "send a message"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ padding: "15px 18px" }}>
          Please login to message other users
        </div>
      )}
      <Modal
        overflow="inside"
        opened={opened}
        onClose={() => {
          setOpened(false);
          setsearch("");
        }}
        title="New message"
      >
        <div style={{ position: "sticky", top: "0" }}>
          <Input
            onChange={(e) => {
              setsearch(e.target.value);
            }}
            variant="default"
            placeholder="Search User"
          />
        </div>
        <div
          style={{
            margin: "10px 0px 20px 0",
          }}
        >
          {users
            .filter((val) => {
              return val.Username.toLowerCase().includes(search.toLowerCase());
            })
            .map((val) => {
              return (
                <div
                  onClick={() => {
                    setOpened(!opened);
                    axios
                      .post(
                        `https://momofirstapi.herokuapp.com/Room/addRoom`,
                        {
                          user2: val.id,
                        },
                        {
                          headers: {
                            accessToken: localStorage.getItem("accessToken"),
                          },
                        }
                      )
                      .then(() => {
                        setNewroom(true);
                      });
                  }}
                  key={val.id}
                  className="searchuser"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    src={val.Image}
                    alt=""
                  />
                  <div> {val.Username}</div>
                </div>
              );
            })}
        </div>
      </Modal>
    </>
  );
};

export default Chatlist;
