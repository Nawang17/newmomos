import { useState, useContext } from "react";
import { Modal } from "@mantine/core";
import { Button, Input, InputWrapper, PasswordInput } from "@mantine/core";
import { UserContext } from "../context/User";
import { login } from "../apiEndpoints/apiEndpoints";
const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const closeFunc = () => {
    setOpened(false);
    setError("");
    setUsername("");
    setPassword("");
  };
  const handlesumbit = () => {
    login(username, password)
      .then((res) => {
        if (!res.data.error) {
          setUserInfo({
            userName: res.data.Username,
            image: res.data.Image,
            loginStatus: true,
            accessToken: res.data.token,
            verified: res.data.verified,
          });

          localStorage.setItem("accessToken", res.data.token);
          window.location.reload();
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => setError(err.message));
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          closeFunc();
        }}
        title="Login"
      >
        <p style={{ color: "red", fontSize: "14px" }}>{error}</p>

        <InputWrapper
          style={{ paddingBottom: "12px" }}
          required
          label="Username"
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </InputWrapper>
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          style={{ paddingBottom: "12px" }}
          placeholder="Password"
          label="Password"
          required
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "13px", cursor: "pointer" }}>
            {/* <Register /> */}
          </p>

          <Button onClick={() => handlesumbit()}>Login</Button>
        </div>
      </Modal>
      <div
        style={{ fontSize: "18px", color: "#1DA1F2", cursor: "pointer" }}
        onClick={() => setOpened(true)}
      >
        Login
      </div>
    </>
  );
};

export default Login;
