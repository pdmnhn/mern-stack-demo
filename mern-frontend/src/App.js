import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Routes/Signup";
// import Login from "./Routes/Login";
// import Profile from "./Routes/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signup />} />
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
