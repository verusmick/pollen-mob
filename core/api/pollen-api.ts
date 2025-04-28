import axios from "axios";

export const pollenApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_POLLEN_DB_URL,
});
