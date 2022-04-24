export const LogoutUser = (setUserInfo) => {
  setUserInfo({
    userName: "",
    image: "",
    loginStatus: false,
    accessToken: "",
    verified: false,
  });
  localStorage.removeItem("accessToken");
  window.location.reload();
};
