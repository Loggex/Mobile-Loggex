import axios from "axios";

const api = axios.create({
    baseURL: 'http://deploy-loggex-backend.azurewebsites.net/api',
});

export const url = 'http://deploy-loggex-backend.azurewebsites.net/staticfiles/images/'

export default api;