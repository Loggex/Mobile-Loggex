import axios from "axios";

const api = axios.create({
    baseURL: 'https://1b20-189-19-219-247.sa.ngrok.io/api',
});

export const url = 'https://1b20-189-19-219-247.sa.ngrok.io/staticfiles/images/'

export default api;