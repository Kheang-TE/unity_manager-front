import axios from './axios.js';
import { connecting } from '@/sockets/socket';
import useUserStore from '@/store/user.store.js';

export const signup = async (user) => {
  try {
    const response = await axios.post('/users', {
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      password: user.password,
      confirmation: user.confirmation,
      code_color: '#267699',
    });
    console.log('new user : ', response.data);
  } catch (error) {
    console.error(error);
  }
};

export const signin = async (email, password) => {
  try {
    const response = await axios.post('users/signin', { email, password });
    const userData = {
      id: response.data.id,
      firstname: response.data.firstname,
      lastname: response.data.lastname,
      email: response.data.email,
      code_color: response.data.code_color,
    };
    console.log('User data:', userData);
    const userStore = useUserStore();
    userStore.setUser(userData);
    connecting(userStore.user);
    return userData;
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    console.log('userData : ', userData);
    const response = await axios.patch(`/users/${userData.id}`, {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      code_color: userData.code_color,
      new_password: userData.new_password,
      confirmation_new_password: userData.confirmation_new_password,
      actual_password: userData.actual_password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signOut = async () => {
  try {
    const response = await axios.get('/users/signout');
    if (response.status === 200) {
      return true;
    }
    console.error('Failed to sign out user: ', response.status);
    return false;
  } catch (error) {
    console.error(error);
    return null;
  }
};
