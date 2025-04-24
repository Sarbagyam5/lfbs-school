import axios from "axios";
const addClassroom = async (data) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/classrooms`,
    data,
    { withCredentials: true }
  );
  return response.data;
};

const getClassroomByAcademicYearId = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/classrooms/academicYear/${id}`,
    { withCredentials: true }
  );
  return response.data;
};
const updateClassroomById = async (id, data) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/classrooms/${id}`,
    data,
    { withCredentials: true }
  );
  return response.data;
};
const deleteClassroomById = async (id) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/api/academic/classrooms/${id}`,
    { withCredentials: true }
  );
  return response.data;
};
export {
  addClassroom,
  getClassroomByAcademicYearId,
  updateClassroomById,
  deleteClassroomById,
};
