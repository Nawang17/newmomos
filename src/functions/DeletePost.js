import axios from "axios";
export const DeletePost = (
  postId,
  Username,
  setPosts,
  setError,
  setErrorMessage,
  history
) => {
  axios
    .delete(
      `http://localhost:3001/Post/deletePost/${postId}/${Username}`,

      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((res) => {
      if (res.data !== "you dont have the permission to delete this post ") {
        history.push("/");
        setPosts((prev) => {
          return prev.filter((post) => post.id !== postId);
        });
      } else {
        setErrorMessage(res.data);
        setError(true);
      }
    })
    .catch((err) => {
      setErrorMessage(err.message);
      setError(true);
    });
};
