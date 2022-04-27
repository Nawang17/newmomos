import axios from "axios";
export const NestedCommentDelete = (deleteid, userid) => {
  axios
    .delete(
      `https://momofirstapi.herokuapp.com/NestedComments/deleteComment/${deleteid}/${userid}`,

      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
      }
    });
};
