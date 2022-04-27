export const LogoutUser = (setUserInfo) => {
  setUserInfo({
    userName: "",
    image: "",
    loginStatus: false,
    verified: false,
  });
  localStorage.removeItem("accessToken");
  window.location.reload();
};
