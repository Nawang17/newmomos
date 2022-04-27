import React from "react";
import { Menu } from "@mantine/core";
import { Trash, Share, UserPlus } from "tabler-icons-react";
import { Modal, Button } from "@mantine/core";
import axios from "axios";
import { UserContext } from "../context/User";
import { DeleteComment } from "../functions/DeleteComment";
const CommentMenu = ({ Username, postId, setComments }) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { UserInfo, setError, setErrorMessage, following, setFollowing } =
    React.useContext(UserContext);
  const followuser = () => {
    if (UserInfo.loginStatus) {
      axios
        .post(
          "https://momofirstapi.herokuapp.com/Profile/follow",
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
          } else {
            setFollowing((prev) => prev.filter((item) => item !== Username));
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
          <Menu.Item onClick={() => followuser()} icon={<UserPlus size={14} />}>
            {following.includes(Username)
              ? `Unfollow ${Username}`
              : `Follow ${Username}`}
          </Menu.Item>
        )}
        <Menu.Item
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Share Comment",
                url: window.location.href,
              });
            }
          }}
          icon={<Share size={14} />}
        >
          Share Comment
        </Menu.Item>

        {UserInfo.userName === Username && (
          <>
            <Menu.Item
              onClick={() => setModalOpen(true)}
              color="red"
              icon={<Trash size={14} />}
            >
              Delete Comment
            </Menu.Item>
          </>
        )}
      </Menu>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Delete Comment?"
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
              DeleteComment(
                postId,
                Username,
                setComments,
                setError,
                setErrorMessage
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

export default CommentMenu;
