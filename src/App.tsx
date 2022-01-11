import React from "react";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import MatchMaker from "./components/MainApp/MatchMaker/MatchMaker";
import Profile from "./components/MainApp/Profile/Profile";
import SignUpTwo from "./components/Auth/SignUpTwo";
import { isAuth, setAuth } from "./store/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const token: string | null = localStorage.getItem("token");
  if (token) {
    dispatch(setAuth({ token: token }));
  }
  const authenticated: boolean = useSelector(isAuth);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LandingPage />
            </>
          }
        />
        <Route
          path={"/signup"}
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />
        <Route
          path={"/signupTwo"}
          element={
            <>
              <Navbar />
              <SignUpTwo />
            </>
          }
        />
        <Route
          path={"/login"}
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        {authenticated && (
          <Route path={"/app/matchmaker"} element={<MatchMaker />} />
        )}
        {authenticated && <Route path={"/app/profile"} element={<Profile />} />}
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
};

export default App;
