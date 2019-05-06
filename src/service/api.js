import axios from 'axios';

const api = axios.create({
    baseURL: "https://backend-fileupload.herokuapp.com"
});

export default api;