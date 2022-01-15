import axios from "axios";

export const baseUrl = process.env.REACT_APP_URL || "";
export const mainApi = axios.create({
  baseURL: baseUrl,
});
