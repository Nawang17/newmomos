import React from "react";
import { Notification } from "@mantine/core";
import { Check } from "tabler-icons-react";
import { useHistory } from "react-router-dom";
export const SuccessAlert = ({
  setSuccess,
  successText,
  postinfo,
  successType,
}) => {
  const history = useHistory();
  return (
    <div
      style={{
        position: "sticky",
        top: "4.5%",
        width: "100%",
        zIndex: "9999",
        cursor: "pointer",
      }}
    >
      <Notification
        onClick={() => {
          if (successType === "newPost") {
            history.push(`/Post/${postinfo.user}/${postinfo.postId}`);
          } else if (successType === "follow") {
            history.push(`/Profile/${postinfo.user}`);
          }
        }}
        onClose={() => setSuccess(false)}
        icon={<Check size={18} />}
        color="teal"
      >
        {successText}
      </Notification>
    </div>
  );
};
