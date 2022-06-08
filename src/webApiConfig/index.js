
import axios from 'axios';

const axiosConn = axios.create();

axiosConn.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default axiosConn;