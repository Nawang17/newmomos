import axios from "axios";
//https://momofirstapi.herokuapp.com/
//https://momofirstapi.herokuapp.com/
const url = "https://momofirstapi.herokuapp.com/";
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
export const loadMoreposts = (
  pageCount,
  setPosts,
  setError,
  setErrorMessage
) => {
  axios
    .get(`${url}Post/getPosts?page=${pageCount + 1}`, {
      headers: {
        accessToken: token,
      },
    })
    .then((res) => {
      setPosts((prevState) => [...prevState, ...res.data.listOfPosts]);
    })
    .catch((err) => {
      setError(true);
      setErrorMessage(err.message);
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

export const Reply = (
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
export const getNotifications = () => {
  return axios.get(`${url}Noti/getNoti?page=0`, {
    headers: {
      accessToken: token,
    },
  });
};
export const loadMoreNotis = (
  pageCount,
  setNotifications,
  setError,
  setErrorMessage
) => {
  axios
    .get(`${url}Noti/getNoti?page=${pageCount + 1}`, {
      headers: {
        accessToken: token,
      },
    })
    .then((res) => {
      setNotifications((prevState) => [...prevState, ...res.data.Noti]);
    })
    .catch((err) => {
      setError(true);
      setErrorMessage(err.message);
    });
};
export const notiSeen = (notiId) => {
  axios.put(`${url}Noti/clicked`, {
    id: notiId,
  });
};
