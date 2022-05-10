import axios from "axios";

const api = axios.create({
    baseURL: 'https://dcef-2804-431-c7df-f88c-5851-c4da-7644-1c0.sa.ngrok.io/api',
});

export default api;