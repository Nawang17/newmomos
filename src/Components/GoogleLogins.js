import GoogleLogin from "react-google-login";
import axios from "axios";
import "../styles/GoogleLogin.css";

import { useContext } from "react";
import { UserContext } from "../context/User";
const GoogleLogins = () => {
  const { setUserInfo } = useContext(UserContext);
  const GoogleSuccess = async (res) => {
    axios
      .post("https://momofirstapi.herokuapp.com/authenticate/googleauth", {
        Username: res.profileObj.name,
        email: res.profileObj.email,
        Image: res.profileObj.imageUrl,
      })
      .then((resp) => {
        setUserInfo({
          userName: resp.data.Username,
          image: resp.data.Image,
          loginStatus: true,
          verified: resp.data.verified,
        });
        localStorage.setItem("accessToken", resp.data.token);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GoogleFailure = (error) => {
    console.log(error);

    console.log("Google sign in was unsuccesfful. Try Again Later");
  };
  return (
    <div>
      {localStorage.getItem("accessToken") ? (
        <></>
      ) : (
        <GoogleLogin
          clientId="933476491467-ou90tpjuc8gm4mbenn907d6jq4td1hkd.apps.googleusercontent.com"
          render={(renderProps) => (
            <div
              className="container"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <div className="google-login">
                <div className="googleicon">
                  <img
                    className="google-icon"
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                <div className="loginText"> Login with Google</div>
              </div>
            </div>
          )}
          onSuccess={GoogleSuccess}
          onFailure={GoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
};

export default GoogleLogins;
