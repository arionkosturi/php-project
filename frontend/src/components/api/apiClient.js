import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost/php-project/backend/",

  headers: {
    "Content-Type": "application/json",
  },
});
