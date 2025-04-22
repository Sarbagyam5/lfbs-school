const { default: axios } = require("axios");

const addTeacher = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/teachers`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

const getAllTeachers = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/teachers`,
    { withCredentials: true }
  );
  return response.data;
};
const deleteTeacherById = async (id) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/teachers/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

const getteacherById = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/teachers/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

const updateTeacherById = async (id, data) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/teachers/${id}`,
    data,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export {
  addTeacher,
  getAllTeachers,
  deleteTeacherById,
  getteacherById,
  updateTeacherById,
};
