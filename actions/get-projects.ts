import axios from "axios";

export const getProjects = async () => {
  try {
    const url = "http://127.0.0.1:8000/api/";
    // const url = process.env.NEXTAUTH_BACKEND_URL
    const response = await axios.get(`${url}project/?format=json`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("error");
    return [];
  }
};
