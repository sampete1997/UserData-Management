
import axios from 'axios';

const axiosConn = axios.create();

if (process.env.NODE_ENV === 'development') {
    axiosConn.defaults.baseURL = 'http://localhost:3001';
} else {

        axiosConn.defaults.baseURL = process.env.REACT_APP_BASE_URL_PROD;


}

export default axiosConn;