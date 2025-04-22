import axios from "axios";
//////Auth///////////////////////
const loginReq = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

const authUser = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/authUser`,
    { withCredentials: true }
  );
  return response.data;
};

const logoutUser = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

const updateUserById = async (id, data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}/update`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

////////////////////AcademicYears///////////////////////////////////////////
const getAcademicYears = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/academicYears`,
    { withCredentials: true }
  );
  return response.data;
};

const addAcademicYears = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/academicYears`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

const deleteAcademicYearById = async (id) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/academicYears/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

const updateAcademicYears = async (data, id) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/academicYears/${id}`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

///////////////////////////Subject//////////////////////////////////////////
const getSubjects = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/subjects`,
    { withCredentials: true }
  );
  return response.data;
};

const addSubjects = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/subjects`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

const deleteSubjectById = async (id) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/subjects/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

const UpdateSubjectById = async (data, id) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/subjects/${id}`,
    data,
    { withCredentials: true }
  );
  return response.data;
};


export {
  loginReq,
  authUser,
  logoutUser,
  getUserById,
  updateUserById,
  getAcademicYears,
  addAcademicYears,
  deleteAcademicYearById,
  updateAcademicYears,
  getSubjects,
  addSubjects,
  deleteSubjectById,
  UpdateSubjectById,
};
