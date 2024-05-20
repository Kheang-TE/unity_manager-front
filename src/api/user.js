import axios from './axios';

export const signin = async (email, password) => {
  try {
    const response = await axios.post('users/signin', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
