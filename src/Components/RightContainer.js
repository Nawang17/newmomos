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
    following,
    setFollowing,
    setError,
    setErrorMessage,
    setsuccessType,
    setsuccessText,
    setSuccess,
    setpostinfo,
  } = useContext(UserContext);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/Profile/suggestedUsers", {
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
          "http://localhost:3001/Profile/follow",
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
            setsuccessType("follow");
            setsuccessText(`You are now following ${name}`);
            setSuccess(true);
            setpostinfo({
              user: name,
              postId: "",
            });
            setTimeout(() => {
              setSuccess(false);
            }, "5000");
            setSuggestedUsers((val) =>
              val.filter((user) => user.Username !== name)
            );
            setFollowing((val) => [...val, name]);
          } else {
            setsuccessType("follow");
            setsuccessText(`You are no longer following ${name}`);
            setSuccess(true);
            setpostinfo({
              user: name,
              postId: "",
            });
            setTimeout(() => {
              setSuccess(false);
            }, "5000");
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
            return (
              !following.includes(val.Username) &&
              UserInfo.userName !== val.Username
            );
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
      <div className="footer">
        <div className="footerlinks">
          <div
            onClick={() => {
              history.push("/About");
            }}
            className="footeritem"
          >
            About
          </div>
          <div
            onClick={() => {
              window.open("https://github.com/Nawang17");
            }}
            className="footeritem"
          >
            Github
          </div>
          <div
            onClick={() => {
              window.open("https://nawang.netlify.app/");
            }}
            className="footeritem"
          >
            Projects
          </div>
        </div>
        <div>© 2022 Momos by Nawang</div>
      </div>
    </div>
  );
};

export default RightContainer;
