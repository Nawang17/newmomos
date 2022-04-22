import axios from "axios";

export const loadMoreposts = (pageCount, setPosts) => {
  axios
    .get(
      `https://momofirstapi.herokuapp.com/Post/getPosts?page=${pageCount + 1}`,
      {
        headers: {
          accessToken: localStorage.getItem("accesstoken"),
        },
      }
    )
    .then((res) => {
      setPosts((prevState) => [...prevState, ...res.data.listOfPosts]);
    });
};
