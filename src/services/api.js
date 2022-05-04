import axios from "axios";

const api = axios.create({
    baseURL: 'http://192.168.3.82:5000/api',
    // baseURL: 'http://192.168.15.10:5000/api',
});

export default api;