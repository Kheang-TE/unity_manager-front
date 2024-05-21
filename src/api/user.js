import axios from './axios.js';

const signup = async (user) => {
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

export default signup;
