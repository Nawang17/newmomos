import { useState, useContext, useEffect } from "react";
import "../styles/Message.css";
import { UserContext } from "../context/User";
import { Socketint } from "../functions/Socketint";
import { useParams, useHistory } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { Input, Button } from "@mantine/core";
const Message = () => {
  const history = useHistory();
  const { setpath, UserInfo } = useContext(UserContext);

  const socket = Socketint;
  const [messages, setMessages] = useState([]);
  const { room, username } = useParams();
  const location = useLocation();
  useEffect(() => {
    setMessages(location.state.messages);
    console.log(location.state.messages);
  }, [location]);
  useEffect(() => {
    if (UserInfo.loginStatus) {
      socket.on("newmsg", (data) => {
        console.log(data);
        if (data.room === parseInt(room)) {
          setMessages((prev) => [...prev, data]);
        }
      });
    } else {
      history.push("/");
    }
    setpath(username);

    // return () => {
    //   socket.emit("leaveroom", {
    //     username: UserInfo.userName,
    //     room: parseInt(room),
    //   });
    // };
    // eslint-disable-next-line no-use-before-define
  }, [socket]);

  const [message, setMessage] = useState("");
  const addnewchat = () => {
    if (message.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random(),
          GoogleAuth: {
            Username: UserInfo.userName,
            Image: UserInfo.image,
          },
          message: message,
          createdAt: Date().toString(),
        },
      ]);
      socket.emit("msg", {
        username: UserInfo.userName,
        msg: message,
        img: UserInfo.image,
        room: parseInt(room),
      });
      setMessage("");
      axios.post(
        `https://momofirstapi.herokuapp.com/Message/addMessage`,
        {
          message,
          roomid: room,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
    }
  };

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messages.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={
                    UserInfo.userName !== messageContent.GoogleAuth.Username
                      ? "you"
                      : "other"
                  }
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">
                        {moment(messageContent.createdAt).format("LT")}
                      </p>
                      {/* <p id="author">{messageContent.GoogleAuth.Username}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="">
          <div style={{ display: "flex", gap: "5px", padding: "10px " }}>
            <Input
              style={{ width: "100%" }}
              placeholder="Send a message..."
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              value={message}
              onKeyPress={(event) => {
                event.key === "Enter" && addnewchat();
              }}
              variant="default"
            />
            <Button
              onClick={() => {
                addnewchat();
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
