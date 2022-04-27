import { useState, useContext } from "react";
import { Loader, Modal } from "@mantine/core";
import { Button, Input, InputWrapper, PasswordInput } from "@mantine/core";
import { UserContext } from "../context/User";
import { login, Register } from "../apiEndpoints/apiEndpoints";
import Login from "./Login";
const RegisterModal = () => {
  const { setUserInfo } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [success, setsuccess] = useState("");
  const [loading, setloading] = useState(false);
  const closeFunc = () => {
    setOpened(false);
    setError("");
    setUsername("");
    setPassword("");
    setConfirmpass("");
    setsuccess("");
    setloading(false);
  };
  const handlesumbit = () => {
    setloading(true);
    username || password || confirmpass
      ? Register(username, password, confirmpass)
          .then((res) => {
            if (res.data.error) {
              setError(res.data.message);
            } else {
              setError("");
              setsuccess(
                "Account created successfully, you will be logged in shortly*"
              );
              setTimeout(() => {
                setloading(true);
                login(username, password)
                  .then((res) => {
                    if (!res.data.error) {
                      setUserInfo({
                        userName: res.data.Username,
                        image: res.data.Image,
                        loginStatus: true,
                        verified: res.data.verified,
                      });

                      localStorage.setItem("accessToken", res.data.token);
                      window.location.reload();
                    } else {
                      setError(res.data.message);
                      setloading(false);
                    }
                  })
                  .catch((err) => {
                    setError(err.message);
                    setloading(true);
                  });
              }, 4000);
            }
          })
          .catch((err) => {
            setError(err.message);
            setloading(false);
          })
      : setError("Please fill all the fields");
    setloading(false);
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          closeFunc();
        }}
        title="Register"
      >
        <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        <p style={{ color: "green", fontSize: "14px" }}>{success}</p>

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
        <PasswordInput
          onChange={(e) => setConfirmpass(e.target.value)}
          style={{ paddingBottom: "12px" }}
          placeholder="Confirm Password"
          label="Confirm Password"
          required
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <p> Already have an account?</p> <Login />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <Button onClick={() => handlesumbit()}>Register</Button>
          )}
        </div>
      </Modal>
      <div
        style={{
          cursor: "pointer",
          color: "#1DA1F2",
        }}
        onClick={() => setOpened(true)}
      >
        Register
      </div>
    </>
  );
};

export default RegisterModal;
