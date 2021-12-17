import axios from 'axios';

const apiUrl = 'http://localhost:8000/';
const prodApiUrl = 'https://blooming-atoll-00837.herokuapp.com/';

const axiosInstance = axios.create({baseURL: prodApiUrl});

export default axiosInstance;
