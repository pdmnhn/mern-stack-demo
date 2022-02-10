import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/api";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  const changeState = (setState) => {
    return ({ target }) => {
      setState(target.value);
    };
  };

  const submit = async (event) => {
    event.preventDefault();
    const res = await login(email, password);
    setEmail("");
    setPassword("");
    if (res.success) {
      window.localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } else {
      showMessage(res.data);
    }
  };

  const showMessage = (message) => {
    setInfo(message);
    setTimeout(() => {
      setInfo("");
    }, 5000);
  };

  return (
    <div>
      {info && info}
      <form onSubmit={submit}>
        <div>
          Email
          <input value={email} type="email" onChange={changeState(setEmail)} />
        </div>
        <div>
          Password
          <input
            value={password}
            type="password"
            onChange={changeState(setPassword)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/">Don't have an account? Signup</Link>
    </div>
  );
};
export default Login;
