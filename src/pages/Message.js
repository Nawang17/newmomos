import { useState, useContext, useEffect } from "react";
import "../styles/Message.css";
import { UserContext } from "../context/User";
import { Socketint } from "../functions/Socketint";
import { useParams, useHistory } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
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
  const addnewchat = (e) => {
    e.preventDefault();
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
      {UserInfo.loginStatus ? (
        <section className="msger">
          <ScrollToBottom className="msger-chat">
            {messages.map((val) => {
              return (
                <div
                  key={val.id}
                  className={
                    val.GoogleAuth.Username === UserInfo.userName
                      ? "msg right-msg"
                      : "msg left-msg"
                  }
                >
                  <div className="msg-img">
                    <img src={val.GoogleAuth.Image} alt="" />
                  </div>

                  <div className="msg-bubble">
                    <div className="msg-bubbletop">
                      <div className="msg-info"></div>

                      <div className="msg-text">{val.message}</div>
                    </div>
                    <div className="msg-info-time">
                      {moment(val.createdAt).format("LT")}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div className="msg right-msg">
            <div className="msg-bubble">
              <div className="msg-bubbletop">
                <div className="msg-text">
                  You can change your name in JS section!
                </div>
              </div>
              <div className="msg-info-time">12:46</div>
            </div>
          </div> */}
          </ScrollToBottom>

          <form className="msger-inputarea">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="msger-input"
              placeholder="Enter your message..."
            />
            <button
              onClick={addnewchat}
              type="submit"
              className="msger-send-btn"
            >
              Send
            </button>
          </form>
        </section>
      ) : (
        <div style={{ padding: "15px 18px" }}>
          Please login to message other users
        </div>
      )}
    </>
  );
};

export default Message;
