import axios from "axios";

export const baseUrl = "http://localhost:4000";
export const mainApi = axios.create({
  baseURL: baseUrl,
});
