import axios from "axios";
export const LikePost = (
  postid,
  postUser,
  LikedPosts,
  posts,
  setPosts,
  setLikePosts
) => {
  axios
    .post(
      "https://momofirstapi.herokuapp.com/Like/likePost",
      {
        PostId: postid,
        postUserId: postUser,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((res) => {
      setPosts(
        posts.map((post) => {
          if (post.id === postid) {
            if (res.data.liked) {
              return { ...post, Likes: [...post.Likes, 0] };
            } else {
              const likeArray = post.Likes;
              likeArray.pop();
              return { ...post, Likes: likeArray };
            }
          } else {
            return post;
          }
        })
      );
      if (LikedPosts.includes(postid)) {
        setLikePosts((prev) => prev.filter((id) => id !== postid));
      } else {
        setLikePosts((prev) => [...prev, postid]);
      }
    });
};
