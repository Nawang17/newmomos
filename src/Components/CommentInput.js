import { useState, useContext } from "react";
import { Input, Badge } from "@mantine/core";
import { UserContext } from "../context/User";
import { Reply } from "../apiEndpoints/apiEndpoints";
import { useParams } from "react-router-dom";
const CommentInput = ({ setNewComment }) => {
  const { username, postid } = useParams();
  const { UserInfo, setError, setErrorMessage } = useContext(UserContext);
  const [replyText, setReplyText] = useState("");
  return (
    <>
      <div className="commentInput">
        <img
          src={
            UserInfo.loginStatus
              ? UserInfo.image
              : "https://res.cloudinary.com/dwzjfylgh/image/upload/v1650822495/jbnmm5pv4eavhhj8jufu.jpg"
          }
          alt=""
        />
        <Input
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          style={{ width: "100%" }}
          placeholder="Write a reply ..."
          rightSectionWidth={70}
          rightSection={
            <Badge
              onClick={() => {
                Reply(
                  postid,
                  replyText,
                  username,
                  UserInfo.loginStatus,
                  setError,
                  setErrorMessage,
                  setNewComment
                );
                setReplyText("");
                setTimeout(() => {
                  setError(false);
                }, "7000");
              }}
              color="blue"
              variant="filled"
            >
              Reply
            </Badge>
          }
        />
      </div>
    </>
  );
};

export default CommentInput;
