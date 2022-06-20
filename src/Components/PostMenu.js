import React from "react";
import { Menu, Divider, Text } from "@mantine/core";
import {
  Search,
  Photo,
  Trash,
  ArrowsLeftRight,
  Share,
  UserPlus,
} from "tabler-icons-react";
import { Modal, Button } from "@mantine/core";
import axios from "axios";
import { UserContext } from "../context/User";
import { DeletePost } from "../functions/DeletePost";
import { useHistory } from "react-router-dom";
const PostMenu = ({ Username, postId, setPosts }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const history = useHistory();
  const {
    UserInfo,
    setError,
    setErrorMessage,
    following,
    setFollowing,
    setsuccessType,
    setsuccessText,
    setSuccess,
    setpostinfo,
  } = React.useContext(UserContext);
  const followuser = () => {
    if (UserInfo.loginStatus) {
      axios
        .post(
          "http://localhost:3001/Profile/follow",
          {
            following: Username,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.followed) {
            setFollowing((prev) => [...prev, Username]);
            setsuccessType("follow");
            setsuccessText(`You are now following ${Username}`);
            setSuccess(true);
            setpostinfo({
              user: Username,
              postId: "",
            });
            setTimeout(() => {
              setSuccess(false);
            }, "5000");
          } else {
            setFollowing((prev) => prev.filter((item) => item !== Username));
            setsuccessType("follow");
            setsuccessText(`You are no longer following ${Username}`);
            setSuccess(true);
            setpostinfo({
              user: Username,
              postId: "",
            });
            setTimeout(() => {
              setSuccess(false);
            }, "5000");
          }
        });
    } else {
      setErrorMessage("You must be logged in to follow a user");
      setError(true);
    }
  };
  return (
    <>
      <Menu position="bottom">
        {UserInfo.userName !== Username && (
          <Menu.Item
            onClick={() => {
              followuser();

              setTimeout(() => {
                setError(false);
              }, "7000");
            }}
            icon={<UserPlus size={14} />}
          >
            {following.includes(Username)
              ? `Unfollow ${Username}`
              : `Follow ${Username}`}
          </Menu.Item>
        )}
        <Menu.Item
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Share Post",
                url: `https://momos.ga/Post/${Username}/${postId}`,
              });
            }
          }}
          icon={<Share size={14} />}
        >
          Share Post
        </Menu.Item>

        {(UserInfo.userName === Username || UserInfo.userName === "Katoph") && (
          <>
            <Menu.Item
              onClick={() => setModalOpen(true)}
              color="red"
              icon={<Trash size={14} />}
            >
              Delete Post
            </Menu.Item>
          </>
        )}
      </Menu>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Delete Post?"
      >
        <p>This can’t be undone and it will be removed from your profile.</p>
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
              DeletePost(
                postId,
                Username,
                setPosts,
                setError,
                setErrorMessage,
                history
              );

              setModalOpen(false);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PostMenu;
