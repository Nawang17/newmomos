import { useState } from "react";
import "../styles/Message.css";

const Message = () => {
  const [chats, setChats] = useState([
    {
      name: "John",
      message: "Hello",
      time: "12:00",
    },
    {
      name: "katoph",
      message: "Hello john",
      time: "12:10",
    },
  ]);
  const [message, setMessage] = useState("");
  const addnewchat = (e) => {
    e.preventDefault();
    setChats([...chats, { name: "John", message: message, time: "12:10" }]);
  };
  return (
    <>
      <section className="msger">
        <main className="msger-chat">
          {chats.map((val, key) => {
            return (
              <div
                key={key}
                className={
                  val.name === "katoph" ? "msg right-msg" : "msg left-msg"
                }
              >
                <div className="msg-img">
                  <img
                    src="https://ui-avatars.com/api/?background=CC3333&color=fff&name=D&size=128"
                    alt=""
                  />
                </div>

                <div className="msg-bubble">
                  <div className="msg-bubbletop">
                    <div className="msg-info"></div>

                    <div className="msg-text">{val.message}</div>
                  </div>
                  <div className="msg-info-time">{val.time}</div>
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
        </main>

        <form className="msger-inputarea">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="msger-input"
            placeholder="Enter your message..."
          />
          <button onClick={addnewchat} type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </>
  );
};

export default Message;
