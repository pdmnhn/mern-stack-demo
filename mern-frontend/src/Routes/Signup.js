import { useState } from "react";
import { signup } from "../services/api";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  const showMessage = (message) => {
    setInfo(message);
    setTimeout(() => {
      setInfo("");
    }, 5000);
  };

  const changeState = (setState) => {
    return ({ target }) => {
      setState(target.value);
    };
  };

  const submit = async (event) => {
    event.preventDefault();
    const res = await signup(
      firstName,
      lastName,
      email,
      phone,
      address,
      password
    );
    showMessage(res);
  };

  return (
    <div>
      {info && info}
      <form onSubmit={submit}>
        <div>
          First Name
          <input value={firstName} onChange={changeState(setFirstName)} />
        </div>
        <div>
          Last Name
          <input value={lastName} onChange={changeState(setLastName)} />
        </div>
        <div>
          Email
          <input value={email} type="email" onChange={changeState(setEmail)} />
        </div>
        <div>
          Phone
          <input value={phone} type="tel" onChange={changeState(setPhone)} />
        </div>
        <div>
          Address
          <input value={address} onChange={changeState(setAddress)} />
        </div>
        <div>
          Passsword
          <input
            value={password}
            type="password"
            onChange={changeState(setPassword)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
