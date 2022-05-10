import axios from "axios";

const api = axios.create({
    baseURL: 'https://1d0e-189-19-219-247.sa.ngrok.io/api',
});

export default api;