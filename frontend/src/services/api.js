import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-system-production-52eb.up.railway.app",
});

export default API;
