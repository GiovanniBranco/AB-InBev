import axios from "axios";

const BASE_URL_BFF = process.env.NEXT_PUBLIC_BFF_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL_BFF,
});

export { axiosClient };
