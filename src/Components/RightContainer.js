import { Button } from "@mantine/core";
import { useEffect, useState, useContext } from "react";
import "../styles/RightContainer.css";
import axios from "axios";
import { UserContext } from "../context/User";
import { MdVerified } from "react-icons/md";
import { useHistory } from "react-router-dom";
const RightContainer = () => {
  const history = useHistory();
  const {
    UserInfo,
    setUserInfo,
    following,
    setFollowing,
    setError,
    setErrorMessage,
  } = useContext(UserContext);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://momofirstapi.herokuapp.com/Profile/suggestedUsers", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setSuggestedUsers(res.data);
      });
  }, []);
  const followuser = (name) => {
    if (UserInfo.loginStatus) {
      axios
        .post(
          "https://momofirstapi.herokuapp.com/Profile/follow",
          {
            following: name,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.followed) {
            setSuggestedUsers((val) =>
              val.filter((user) => user.Username !== name)
            );
            setFollowing((val) => [...val, name]);
          } else {
            setFollowing((val) => val.filter((user) => user !== name));
          }
        });
    } else {
      setErrorMessage("You must be logged in to follow a user");
      setError(true);
    }
  };
  return (
    <div className="RightContainermain">
      <div className="rightcontainerheader">Suggestions for you</div>
      <div className="accounts">
        {suggestedUsers
          .slice(0, 5)
          .filter((val) => {
            return !following.includes(val.Username);
          })
          .map((val, i) => {
            return (
              <div key={i} className="account">
                <div
                  onClick={() => {
                    history.push(`/Profile/${val.Username}`);
                  }}
                  className="accountleft"
                >
                  <img src={val.Image} alt="" />

                  <div className="accountname">
                    <p>{val.Username}</p>
                    {val.verified && <MdVerified color="green" size={14} />}
                  </div>
                </div>
                <div className="accountRight">
                  <Button
                    onClick={() => {
                      followuser(val.Username);
                    }}
                    size="xs"
                    radius={25}
                  >
                    Follow
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightContainer;
