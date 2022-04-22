import "./App.css";
import Bottomnav from "./Components/Bottomnav";
import Topnav from "./Components/Topnav";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Topnav />
      <Home />
      <Bottomnav />
    </div>
  );
}

export default App;
