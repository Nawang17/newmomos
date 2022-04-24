import "./App.css";
import { useState, useEffect } from "react";
import Bottomnav from "./Components/Bottomnav";
import Topnav from "./Components/Topnav";
import Home from "./pages/Home";
import { UserContext } from "./context/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { validUser } from "./apiEndpoints/apiEndpoints";
import Comment from "./pages/Comment";
function App() {
  const [UserInfo, setUserInfo] = useState({
    userName: "",
    image: "",
    loginStatus: false,
    accessToken: "",
    verified: false,
  });
  const [path, setpath] = useState("momos");
  useEffect(() => {
    validUser().then((res) => {
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
    <UserContext.Provider value={{ UserInfo, setUserInfo, path, setpath }}>
      <Router>
        <Topnav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:username/:postid" exact component={Comment} />
        </Switch>

        {UserInfo.loginStatus && <Bottomnav />}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
