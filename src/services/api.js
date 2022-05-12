import axios from "axios";

const api = axios.create({
    baseURL: 'https://ad51-2804-431-c7de-cf25-589-d0da-c908-7722.sa.ngrok.io/api',
});

export default api;