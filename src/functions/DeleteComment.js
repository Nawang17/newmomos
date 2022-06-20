import axios from "axios";
export const DeleteComment = (
  postId,
  Username,
  setComments,
  setError,
  setErrorMessage
) => {
  axios
    .delete(
      `http://localhost:3001/Comment/deleteComment/${postId}/${Username}`,

      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((res) => {
      if (!res.data.deleteComment) {
        setComments((prev) => {
          return prev.filter((comment) => comment.id !== postId);
        });
      } else {
        setErrorMessage("something went wrong");
        setError(true);
      }
    })
    .catch((err) => {
      setErrorMessage(err.message);
      setError(true);
    });
};
