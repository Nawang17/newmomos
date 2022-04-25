import { useSetState } from "@mantine/hooks";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/User";
import "../styles/Notifications.css";
import { getNotifications } from "../apiEndpoints/apiEndpoints";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { loadMoreNotis } from "../apiEndpoints/apiEndpoints";
import { notiSeen } from "../apiEndpoints/apiEndpoints";
const Notifications = () => {
  const history = useHistory();
  const { setpath, UserInfo, setError, setErrorMessage } =
    useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setloading] = useState(false);
  const [notiCount, setnotiCount] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  useEffect(() => {
    setpath("Notifications");
    setloading(true);
    UserInfo.loginStatus
      ? getNotifications()
          .then((res) => {
            setNotifications(res.data.Noti);
            setnotiCount(res.data.notiCount);
            setloading(false);
          })
          .catch((err) => console.log(err))
      : history.push("/");
  }, [UserInfo.loginStatus, history, setpath]);
  return (
    <>
      {!loading ? (
        <div className="Notifications">
          {notifications.map((val) => {
            return (
              <div
                key={val.id}
                onClick={() => {
                  if (val.Clicked === "false") {
                    notiSeen(val.id);
                  } else {
                  }
                  if (val.PostId === "") {
                    history.push(`/${val.Text.split(" ")[0]}`);
                  } else {
                    history.push(`/${UserInfo.userName}/${val.PostId}`);
                  }
                }}
                className={val.Clicked === "True" ? "main" : "mainactive"}
              >
                <img src={val.Image} alt="" />
                <div className="noti">{val.Text}</div>
                <div className="date"> {moment(val.createdAt).fromNow()}</div>
              </div>
            );
          })}
          {notifications.length < notiCount && (
            <div
              onClick={() => {
                setpageCount((prev) => prev + 1);
                loadMoreNotis(
                  pageCount,
                  setNotifications,
                  setError,
                  setErrorMessage
                );
              }}
              className="loadMore"
            >
              Load more Notifications
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Notifications;
