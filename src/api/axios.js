import axios from 'axios';
import handleTokenExpiry from '@/utils/handleTokenExpiry';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
axios.interceptors.response.use(
  (response) => response, // return response if it's not an error
  (error) => {
    // Check if the error is due to an expired token
    if (error.response.status === 401) {
      handleTokenExpiry();
    }
    return Promise.reject(error); // return the error if it's not an expired token
  },
);

export default axios;
