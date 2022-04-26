import React from "react";
import { Modal, Button } from "@mantine/core";
const DeleteModal = ({ openned, setOpened }) => {
  return (
    <Modal
      opened={openned}
      onClose={() => setOpened(false)}
      title="Delete Post?"
    >
      <p>
        This can’t be undone and it will be removed from your profile, the
        timeline of any accounts that follow you, and from Momos search results.
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
        <Button onClick={() => setOpened(false)}>Cancel</Button>
        <Button color="red" onClick={() => setOpened(false)}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
