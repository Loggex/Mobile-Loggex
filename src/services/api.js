import axios from "axios";

const api = axios.create({
    baseURL: 'https://e7bd-2804-431-c7df-bc6c-594e-a550-1cb9-43ec.sa.ngrok.io/api',
});

export default api;