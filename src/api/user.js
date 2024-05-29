import axios from './axios.js';
import { connecting } from '@/sockets/socket';
import  useUserStore  from "@/store/user.store.js";

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
    const response = await axios.post("users/signin", { email, password });
    const userData = {
      id: response.data.id,
      firstname: response.data.firstname,
      lastname: response.data.lastname,
      email: response.data.email,
      code_color: response.data.code_color,
    };
    console.log("User data:", userData);
    const userStore = useUserStore();
    userStore.setUser(userData);
    connecting(userStore.user);
    return userData;
  } catch (error) {
    console.error("Sign in failed:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    console.log('userData : ', userData.id);
    const response = await axios.patch(`/users/${userData.id}`, {
      id: userData.id,
      lastname: userData.lastname,
      firstname: userData.firstname,
      password: userData.password,
      confirmation: userData.confirmation,
      code_color: userData.code_color,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const signOut = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to sign out user: ", response.status);
      return false;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
 
