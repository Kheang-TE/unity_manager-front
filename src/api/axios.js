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
    // Use Promise.reject to propagate the error correctly in the promise chain.
    // This ensures that the error is handled by subsequent `catch` blocks in the chain,
    // maintaining the expected behavior of promise-based error handling.
    // If we don't use Promise.reject, the response will not be returned as a promise
    // and the error will not be handled properly.
    return Promise.reject(error);
  },
);

export default axios;
