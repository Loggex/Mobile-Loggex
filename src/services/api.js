import axios from "axios";

const api = axios.create({
    baseURL: 'https://dc64-2804-431-c7df-348f-70de-6807-8fec-4231.sa.ngrok.io/api',
});

export const url = 'https://dc64-2804-431-c7df-348f-70de-6807-8fec-4231.sa.ngrok.io/staticfiles/images/'

export default api;