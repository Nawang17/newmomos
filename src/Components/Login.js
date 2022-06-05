import { useState, useContext, useEffect } from "react";
import { Loader, Modal } from "@mantine/core";
import { Button, Input, InputWrapper, PasswordInput } from "@mantine/core";
import { UserContext } from "../context/User";
import { login } from "../apiEndpoints/apiEndpoints";
import RegisterModal from "./RegisterModal";
import { Lock } from "tabler-icons-react";
import GoogleLogins from "./GoogleLogins";
const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [mobile, setmobile] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setloading] = useState(false);
  const closeFunc = () => {
    setOpened(false);
    setError("");
    setUsername("");
    setPassword("");
  };
  useEffect(() => {
    if (window.screen.width < 600) {
      setmobile(true);
    }
  }, []);
  const handlesumbit = () => {
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
        setloading(false);
      });
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </InputWrapper>
        <PasswordInput
          value={password}
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
          <div
            style={{
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <p> Don't have an account?</p> <RegisterModal />
          </div>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader />
            </div>
          ) : (
            <Button onClick={() => handlesumbit()}>Login</Button>
          )}
        </div>

        <p
          className="or-text"
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",

            fontSize: "13px",
          }}
        >
          OR
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <GoogleLogins />
          <div
            className="demo"
            onClick={() => {
              setUsername("Demo");
              setPassword("Demo");
            }}
          >
            Try Demo Account
          </div>
        </div>
      </Modal>
      {!mobile && (
        <div onClick={() => setOpened(true)} className="lnavItem">
          <div className="lnavIcon">
            <Lock size={26} />
          </div>
          <div className="lnavText">Login</div>
        </div>
      )}

      {mobile && (
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => setOpened(true)}
        >
          Login
        </div>
      )}
    </>
  );
};

export default Login;
