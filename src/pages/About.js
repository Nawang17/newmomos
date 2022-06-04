import { UserContext } from "../context/User";
import { useContext, useEffect } from "react";
const About = () => {
  const { setpath } = useContext(UserContext);
  useEffect(() => {
    setpath("About");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        fontSize: "15px",
        flexDirection: "column",
        gap: "20px",
        padding: "13px 20px",
        textAlign: "left",
        width: "100%",
        marginBottom: "63px",
      }}
    >
      <p style={{ lineHeight: "24px" }}>
        Welcome to Momos, a Social Network webapp. My name is Nawang, and I am
        the developer of this website. This is a project I created to
        demonstrate my understanding of full stack development.
      </p>
      <h3>Features </h3>
      <li>Login / Register (Google Login option included)</li>
      <li>Creating a new post (text, Image)</li>
      <li>Liking and replying to other users posts</li>
      <li>User Following</li>
      <li>Notifications</li>

      {/* <li>Live chat</li>
      <li>Dark mode</li> */}
      <h3>Technologies</h3>
      <li> Client - React</li>
      <li>Server - Node, Express, SocketIO</li>
      <li> Database - MYSQL</li>
      <li> Hosting - Netlify, Heroku</li>
      <p style={{ lineHeight: "25px" }}>
        Thank you for visiting Momos. If you have any questions, please feel
        free to reach out to me at my discord{" "}
        <span style={{ color: "blue" }}> katoph#7848</span>.
      </p>
    </div>
  );
};

export default About;
