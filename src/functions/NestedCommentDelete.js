import axios from "axios";
export const NestedCommentDelete = (
  postId,
  Username,
  setComments,
  setError,
  setErrorMessage,
  setdeleting
) => {
  setdeleting(false);
  axios
    .delete(
      `http://localhost:3001/NestedComments/deleteComment/${postId}/${Username}`,

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
        setdeleting(true);
      }
    });
};
