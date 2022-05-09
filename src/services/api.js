import axios from "axios";

const api = axios.create({
    baseURL: ' https://bdef-189-19-219-247.sa.ngrok.io/api',
});

export default api;