import React from "react";
import { Notification } from "@mantine/core";

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
        title={alertText}
        color="red"
      ></Notification>
    </div>
  );
};
