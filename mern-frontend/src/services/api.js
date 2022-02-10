import axios from "axios";

const baseUrl = "/api/";

export const signup = async (
  firstName,
  lastName,
  email,
  phone,
  address,
  password
) => {
  const body = { firstName, lastName, email, phone, address, password };
  try {
    await axios.post(baseUrl + "signup", body);
    return "Successfully registered";
  } catch (err) {
    return err.response.data.error;
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(baseUrl + "login", { email, password });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, data: err.response.data.error };
  }
};

export const getUser = async (token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const res = await axios.get(baseUrl + "user", config);
  return res.data;
};
