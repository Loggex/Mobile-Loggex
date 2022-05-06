import axios from "axios";

const api = axios.create({
    baseURL: 'https://cb22-189-19-219-247.sa.ngrok.io/api',
    // baseURL: 'http://192.168.15.10:5000/api',
});

export default api;