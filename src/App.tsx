import React from "react";
import Navbar from "./components/Navbar/Navbar";
import BannerOne from "./components/Landing/BannerOne";
import BannerTwo from "./components/Landing/BannerTwo";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignUp />
      {/*<BannerOne />*/}
      {/*<BannerTwo />*/}
    </div>
  );
}

export default App;
