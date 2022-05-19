import axios from "axios";

const api = axios.create({
    baseURL: ' https://ce45-2804-431-c7de-cf25-e8a5-5dea-b3dd-aa3a.sa.ngrok.io/api',
});

export default api;