import axios from "axios";

export const url = 'https://dec1-2804-431-c7de-6ed8-f5af-a415-3f3-de2f.sa.ngrok.io/staticfiles/images/'

const api = axios.create({
    baseURL: 'https://dec1-2804-431-c7de-6ed8-f5af-a415-3f3-de2f.sa.ngrok.io/api',
});

export default api;