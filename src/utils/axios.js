import axios from "axios";

const loginReq = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

const authUser = async (data) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/authUser`,
    { withCredentials: true }
  );
  return response.data;
};

const logoutUser = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    { withCredentials: true }
  );
  return response.data;
};
export { loginReq, authUser, logoutUser };
