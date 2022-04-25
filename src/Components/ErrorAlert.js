import React from "react";
import { Notification } from "@mantine/core";
import { X } from "tabler-icons-react";
export const ErrorAlert = ({ setError, alertText }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "4.5%",
        width: "100%",
        zIndex: "9999",
      }}
    >
      <Notification
        onClose={() => setError(false)}
        style={{ backgroundColor: "rgb(249 191 191)" }}
        icon={<X size={18} />}
        color="red"
      >
        {alertText}
      </Notification>
    </div>
  );
};
