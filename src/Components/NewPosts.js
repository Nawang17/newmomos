import { useState, useContext, useEffect } from "react";
import { Modal, Button, Textarea, Loader } from "@mantine/core";
import { CircleX, Photo, Plus, SquarePlus } from "tabler-icons-react";
import { UserContext } from "../context/User";
import axios from "axios";
const NewPosts = () => {
  const {
    UserInfo,
    setPosts,
    setsuccessText,
    setSuccess,
    setpostinfo,
    setsuccessType,
  } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");
  const [imgInfo, setimgInfo] = useState({});
  const [imgStatus, setimgStatus] = useState(false);
  const [loading, setloading] = useState(false);
  const [text, settext] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [mobile, setmobile] = useState(false);
  useEffect(() => {
    if (window.screen.width < 600) {
      setmobile(true);
    }
  }, []);
  const closeFunc = () => {
    setOpened(false);
    setError("");
    setimgInfo({});
    setimgStatus(false);
    setloading(false);
    settext("");
    setImagePreview("");
  };
  const handlesumbit = () => {
    if (UserInfo.loginStatus) {
      if (text || imagePreview) {
        if (imgStatus) {
          setloading(true);
          const formData = new FormData();
          formData.append("file", imgInfo);
          formData.append("upload_preset", "kxy10xnr");
          axios
            .post(
              "https://api.cloudinary.com/v1_1/dwzjfylgh/image/upload",
              formData
            )
            .then((res) => {
              axios
                .post(
                  "https://momofirstapi.herokuapp.com/Post/addPost",

                  {
                    post: text,
                    postImage: res.data.secure_url,
                    imagekey: res.data.public_id,
                  },

                  {
                    headers: {
                      accessToken: localStorage.getItem("accessToken"),
                    },
                  }
                )
                .then((res) => {
                  if (res.data.error) {
                    setError(res.data.message);
                    setloading(false);
                  } else {
                    closeFunc();
                    setPosts((prevState) => [res.data.newpost, ...prevState]);
                  }
                });
            })
            .catch((error) => {
              if (error.response) {
                setError(error.response.data);
                setloading(false);
              }
            });
        } else {
          setloading(true);

          axios
            .post(
              "https://momofirstapi.herokuapp.com/Post/addPost",
              {
                post: text,
                postImage: null,
                imagekey: null,
              },

              {
                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                },
              }
            )
            .then((res) => {
              if (res.data.error) {
                setError(res.data.message);
                setloading(false);
              } else {
                closeFunc();
                setPosts((prevState) => [res.data.newpost, ...prevState]);
                setpostinfo({
                  user: res.data.newpost.Username,
                  postId: res.data.newpost.id,
                });
                setsuccessType("newPost");
                setsuccessText("New Post Added Successfully");
                setSuccess(true);
                setTimeout(() => {
                  setSuccess(false);
                }, "10000");
              }
            })
            .catch((error) => {
              if (error.response) {
                setError(error.message);
                setloading(false);
              }
            });
        }
      } else {
        setError("Post cannot be empty");
      }
    } else {
      setError("You must be logged in to create a post");
    }
  };
  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={() => {
          closeFunc();
        }}
      >
        <p style={{ fontSize: "14px", color: "red" }}> {error}</p>
        <Textarea
          value={text}
          maxLength={255}
          label="Post Something"
          onChange={(e) => settext(e.target.value)}
          placeholder="Write something"
          required
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "13px",
          }}
        >
          {text.length} / 255
        </div>
        <div
          style={{
            paddingTop: "15px",
            paddingBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span class="upload-btn-wrapper">
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Photo style={{ color: "#579ffb" }} />

                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Add image
                </span>
              </div>
              <input
                accept="image/*"
                type="file"
                onChange={(e) => {
                  setimgInfo(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                  setimgStatus(true);
                }}
              />
            </span>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Button onClick={() => handlesumbit()} size="xs">
              Create Post
            </Button>
          )}
        </div>
        {imgStatus && (
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              src={imagePreview}
              style={{
                borderRadius: "7px",
                width: "150px",
                height: "auto",
              }}
              alt=""
            />
            <span
              onClick={() => {
                setImagePreview("");
                setimgStatus(false);
                // setimgstatus(false);
                // setimgdata("");
                // setpreview("");
              }}
              style={{
                position: "absolute",
                right: "2px",
                top: "2px",
              }}
            >
              <CircleX />
            </span>
          </div>
        )}
      </Modal>
      {mobile ? (
        <div onClick={() => setOpened(true)} className="newPosts">
          <Plus />
        </div>
      ) : (
        <div onClick={() => setOpened(true)} className="lnavItem">
          <div className="lnavIcon">
            <SquarePlus size={26} />
          </div>
          <div className="lnavText">New Post</div>
        </div>
      )}
    </>
  );
};

export default NewPosts;
