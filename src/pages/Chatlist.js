import { UserContext } from "../context/User";
import { useEffect, useContext } from "react";
import "../styles/Chats.css";
import { useHistory } from "react-router-dom";

const Chatlist = () => {
  const history = useHistory();
  const { setpath } = useContext(UserContext);
  useEffect(() => {
    setpath("Messages");
  }, []);
  return (
    <div className="Chats">
      {new Array(20).fill(0).map((val, id) => {
        return (
          <div
            onClick={() => {
              history.push("/Message/Demo");
            }}
            key={id}
            className="Chat"
          >
            <img
              src="https://ui-avatars.com/api/?background=CC3333&color=fff&name=D&size=128"
              alt=""
            />
            <div className="ChatRight">
              <div className="ChatRightTop">
                <div className="chatuser">Demo</div>
                <div className="chatdate">6/9/22 </div>
              </div>
              <div className="ChatRightBottom">Active now</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chatlist;
