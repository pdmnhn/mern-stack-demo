import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Routes/Signup";
import Login from "./Routes/Login";
import Profile from "./Routes/Profile";
import { useEffect, useState } from "react";

const App = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [token]);
  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <>
            <Route index element={<Navigate replace to="/profile" />} />
            <Route path="login" element={<Navigate replace to="/profile" />} />
          </>
        ) : (
          <>
            <Route index element={<Signup />} />
            <Route path="login" element={<Login setToken={setToken} />} />
            <Route path="profile" element={<Navigate replace to="/" />} />
          </>
        )}
        <Route path="profile" element={<Profile setToken={setToken} />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
