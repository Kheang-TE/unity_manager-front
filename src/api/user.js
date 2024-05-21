import { connecting } from '@/sockets/socket';
import axios from './axios';

export const signin = async (email, password) => {
  try {
    const response = await axios.post('users/signin', {
      email,
      password,
    });
    connecting(response.data.firstname);
    return response.data;
  } catch (error) {
    throw error;
  }
};
