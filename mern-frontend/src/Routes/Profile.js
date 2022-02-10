import { useEffect, useState } from "react";
import { getUser } from "../services/api";

const Profile = ({ setToken }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await getUser(window.localStorage.getItem("token"));
      setUser(res);
    };
    getData();
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div>
      {user && (
        <>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
          <div>{user.address}</div>
          <button onClick={logout}>logout</button>
        </>
      )}
    </div>
  );
};
export default Profile;
