import axios from "axios";
const url = "http://localhost:3001/";
const token = localStorage.getItem("accessToken");
export const validUser = () => {
  return axios.get(`${url}authenticate/validUser`, {
    headers: {
      accessToken: token,
    },
  });
};

export const getHomePosts = () => {
  return axios.get(`${url}Post/getPosts?page=0`, {
    headers: {
      accessToken: token,
    },
  });
};
export const LikePosts = (postid, postUser) => {
  return axios.post(
    `${url}Like/likePost`,
    {
      PostId: postid,
      postUserId: postUser,
    },
    {
      headers: {
        accessToken: token,
      },
    }
  );
};
export const loadMoreposts = (pageCount, setPosts) => {
  axios
    .get(`${url}Post/getPosts?page=${pageCount + 1}`, {
      headers: {
        accessToken: token,
      },
    })
    .then((res) => {
      setPosts((prevState) => [...prevState, ...res.data.listOfPosts]);
    });
};

export const getComments = (username, postid) => {
  return axios.get(`${url}Comment/getComments/${postid}/${username}`, {
    headers: {
      accessToken: token,
    },
  });
};
export const login = (username, password) => {
  return axios.post(`${url}LoginUsers/login`, {
    Username: username,
    Password: password,
  });
};
