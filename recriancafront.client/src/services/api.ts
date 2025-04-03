import axios from "axios";

const api = axios.create({
  baseURL: "https://recrianca1.azurewebsites.net/api/",
});

export default api;
