import axios from "axios";

const api = axios.create({
    baseURL: 'https://9e7e-189-19-219-247.sa.ngrok.io/api',
});

export const url = 'https://9e7e-189-19-219-247.sa.ngrok.io/staticfiles/images/'

export default api;