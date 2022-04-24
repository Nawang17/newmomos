import axios from "axios";
const Reply = (
  id,
  PostText,
  name,
  loginStatus,
  setError,
  setErrorMessage,
  setNewComment
) => {
  setNewComment(false);
  if (loginStatus) {
    if (!PostText || /^\s*$/.test(PostText)) {
      setErrorMessage("Reply cannot be empty");
      setError(true);
    } else {
      axios
        .post(
          "https://momofirstapi.herokuapp.com/Comment/addComment",
          {
            PostId: id,
            replyText: PostText,
            postUserId: name,
          },

          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.error) {
            setErrorMessage(res.data.message);

            setError(true);
          } else {
            setNewComment(true);
          }
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setError(true);
        });
    }
  } else {
    setErrorMessage("You must be logged in to reply to a post");
    setError(true);
  }
};

export default Reply;
