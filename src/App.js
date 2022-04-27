import "./App.css";
import { useState, useEffect } from "react";
import Bottomnav from "./Components/Bottomnav";
import Topnav from "./Components/Topnav";
import Home from "./pages/Home";
import { UserContext } from "./context/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { validUser } from "./apiEndpoints/apiEndpoints";
import Comment from "./pages/Comment";
import { ErrorAlert } from "./Components/ErrorAlert";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import axios from "axios";
function App() {
  const [UserInfo, setUserInfo] = useState({
    userName: "",
    image: "",
    loginStatus: false,
    verified: false,
  });
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [path, setpath] = useState("momos");
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    validUser().then((res) => {
      if (res.data.validUser) {
        setUserInfo({
          userName: res.data.username,
          image: res.data.Image,
          loginStatus: true,

          verified: res.data.verified,
        });
        axios
          .get(
            `https://momofirstapi.herokuapp.com/Profile/followingData/${res.data.username}`
          )
          .then((res) => {
            setFollowing(res.data.following);
          });
      } else {
        setUserInfo({
          userName: "",
          image: "",
          loginStatus: false,
          verified: false,
        });
        localStorage.removeItem("accessToken");
      }
    });
  }, []);
  return (
    <>
      {Error && <ErrorAlert alertText={ErrorMessage} setError={setError} />}

      <UserContext.Provider
        value={{
          UserInfo,
          setUserInfo,
          path,
          setpath,
          setError,
          setErrorMessage,
          following,
          setFollowing,
        }}
      >
        <Router>
          <Topnav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Post/:username/:postid" exact component={Comment} />
            <Route path="/Notifications" exact component={Notifications} />
            <Route path="/Profile/:username" exact component={Profile} />
          </Switch>

          <Bottomnav />
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
