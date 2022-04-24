import { LikePosts } from "../apiEndpoints/apiEndpoints";
export const LikePost = (
  postid,
  postUser,
  LikedPosts,
  posts,
  setPosts,
  setLikePosts,
  loginStatus,
  setError,
  setErrorMessage
) => {
  if (loginStatus) {
    LikePosts(postid, postUser)
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
          setLikePosts(LikedPosts.filter((id) => id !== postid));
        } else {
          setLikePosts([...LikedPosts, postid]);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setError(true);
      });
  } else {
    setErrorMessage("You must be logged in to like a post");
    setError(true);
  }
};
