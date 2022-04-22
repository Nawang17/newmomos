import "./App.css";
import { useState, useEffect } from "react";
import Bottomnav from "./Components/Bottomnav";
import Topnav from "./Components/Topnav";
import Home from "./pages/Home";
import axios from "axios";
import { UserContext } from "./context/User";
function App() {
  const [UserInfo, setUserInfo] = useState({
    userName: "",
    image: "",
    loginStatus: false,
    accessToken: "",
    verified: false,
  });
  useEffect(() => {
    axios
      .get("https://momofirstapi.herokuapp.com/authenticate/validUser", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.validUser) {
          setUserInfo({
            userName: res.data.username,
            image: res.data.Image,
            loginStatus: true,
            accessToken: localStorage.getItem("accessToken"),
            verified: res.data.verified,
          });
        } else {
          setUserInfo({
            userName: "",
            image: "",
            loginStatus: false,
            accessToken: "",
            verified: false,
          });
          localStorage.removeItem("accessToken");
        }
      });
  }, []);
  return (
    <div className="App">
      <UserContext.Provider value={{ UserInfo, setUserInfo }}>
        <Topnav />
        <Home />
        {UserInfo.loginStatus && <Bottomnav />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
