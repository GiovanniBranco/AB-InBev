import axios from "axios";

const BASE_URL_BFF = process.env.BFF_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL_BFF,
});

export { axiosClient };
