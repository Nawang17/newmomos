import { Button, Modal } from "@mantine/core";
import { useEffect, useState, useContext } from "react";
import { CalendarEvent, User } from "tabler-icons-react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { Badge } from "@mantine/core";
import { UserContext } from "../context/User";

const ProfileHeader = ({
  profileInfo,
  UserInfo,
  setError,
  setErrorMessage,
  Following,
  setFollowing,
  exists,
}) => {
  const history = useHistory();
  const { username } = useParams();
  const [following, setfollowing] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [isFollowing, setisFollowing] = useState(false);
  const [opened, setOpened] = useState(false);

  const [openned, setOpenned] = useState(false);
  const { setsuccessType, setsuccessText, setSuccess, setpostinfo } =
    useContext(UserContext);
  useEffect(() => {
    axios
      .get(
        `https://momofirstapi.herokuapp.com/Profile/followData/${username}/${
          UserInfo.userName || null
        }`
      )
      .then((res) => {
        setfollowing(res.data.Userfollowing);
        setfollowers(res.data.Userfollower);
        setisFollowing(res.data.isfollowing);
      });
  }, []);
  const followuser = () => {
    if (UserInfo.loginStatus) {
      axios
        .post(
          "https://momofirstapi.herokuapp.com/Profile/follow",
          {
            following: username,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.followed) {
            setfollowers((prev) => [
              ...prev,
              { id: 1231, follower: UserInfo.userName },
            ]);

            setisFollowing(true);
            setFollowing((prev) => [...prev, username]);
            setsuccessType("follow");
            setsuccessText(`You are now following ${username}`);
            setSuccess(true);
            setpostinfo({
              user: username,
              postId: "",
            });
            setTimeout(() => {
              setSuccess(false);
            }, "5000");
          } else {
            setsuccessType("follow");
            setsuccessText(`You are no longer following ${username}`);
            setSuccess(true);
            setpostinfo({
              user: username,
              postId: "",
            });
            setTimeout(() => {
              setSuccess(false);
            }, "5000");
            setfollowers((prev) =>
              prev.filter((item) => item.follower !== UserInfo.userName)
            );

            setisFollowing(false);
            setFollowing((prev) => prev.filter((item) => item !== username));
          }
        });
    } else {
      setErrorMessage("You must be logged in to follow a user");
      setError(true);
    }
  };
  return (
    <>
      <div className="ProfileHeader">
        <div className="ProfileHeadertop">
          <div
            className="profileTop
    "
          >
            <img className="profileImage" src={profileInfo.Image} alt="" />
            {exists && (
              <div>
                {username !== UserInfo.userName &&
                  (!isFollowing ? (
                    <Button
                      onClick={() => {
                        followuser();
                        setTimeout(() => {
                          setError(false);
                        }, "7000");
                      }}
                      radius={25}
                    >
                      Follow
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        followuser();
                        setTimeout(() => {
                          setError(false);
                        }, "7000");
                      }}
                      variant="outline"
                      radius={25}
                    >
                      Following
                    </Button>
                  ))}
              </div>
            )}
          </div>

          <div className="username">
            <p>{profileInfo.Username}</p>
            {profileInfo.verified && <MdVerified color="green" size={14} />}
            {following.some((e) => e.following === UserInfo.userName) && (
              <div style={{ marginLeft: "3px" }}>
                <Badge color="gray" size="sm">
                  Follows you
                </Badge>
              </div>
            )}
          </div>
          {profileInfo.description !== "no" && (
            <div className="description">
              <p>{profileInfo.description}</p>
            </div>
          )}

          <div className="joinedDate">
            <CalendarEvent size={19} />
            <p>Joined {moment(profileInfo.createdAt).format("MMMM YYYY")}</p>
          </div>
          <div className="followData">
            <div
              onClick={() => {
                setOpened(!opened);
              }}
              className="followers"
            >
              <strong>{following.length}</strong> Following
            </div>
            <div
              onClick={() => {
                setOpenned(!openned);
              }}
              className="followers"
            >
              <strong>{followers.length}</strong> Followers
            </div>
          </div>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        overflow="inside"
        title="Following"
      >
        {following.map((item) => {
          return (
            <div
              onClick={() => history.push(`/Profile/${item.following}`)}
              style={{ paddingBottom: "20px", cursor: "pointer" }}
              key={item.id}
            >
              {item.following}
            </div>
          );
        })}
      </Modal>
      <Modal
        opened={openned}
        onClose={() => setOpenned(false)}
        overflow="inside"
        title="Followers"
      >
        {followers.map((item) => {
          return (
            <div
              onClick={() => history.push(`/Profile/${item.follower}`)}
              style={{ paddingBottom: "20px", cursor: "pointer" }}
              key={item.id}
            >
              {item.follower}
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default ProfileHeader;
