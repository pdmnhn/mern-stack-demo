import axios from "axios";

export const signup = async (
  firstName,
  lastName,
  email,
  phone,
  address,
  password
) => {
  const body = { firstName, lastName, email, phone, address, password };
  const res = await axios.post("/api/signup", body);
  if (res.status !== 201) {
    return res.data.error;
  } else {
    return "Successfully registered";
  }
};
