import axios from "axios";

const api = axios.create({
    baseURL: 'https://1799-2804-431-c7de-6ed8-50e3-2e0e-731d-f63a.sa.ngrok.io/api',
});

export default api;