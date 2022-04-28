import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8081/",
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});
