import React from "react";
import { Menu, Divider, Text } from "@mantine/core";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";
import { Modal, Button } from "@mantine/core";

import { UserContext } from "../context/User";
import { DeletePost } from "../functions/DeletePost";
import { useHistory } from "react-router-dom";
const PostMenu = ({ Username, postId, setPosts }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const history = useHistory();
  const { UserInfo, setError, setErrorMessage } = React.useContext(UserContext);
  return (
    <>
      <Menu position="bottom">
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<MessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<Search size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Divider />
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<ArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        {UserInfo.userName === Username && (
          <Menu.Item
            onClick={() => setModalOpen(true)}
            color="red"
            icon={<Trash size={14} />}
          >
            Delete Post
          </Menu.Item>
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
