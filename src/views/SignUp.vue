<template>
  <div class="background-wall"></div>
  <div class="signup">
    <header class="container">
      <div class="row">
        <div class="col">
          <div class="logo-container">
            <a href="/" rel="home">
              <img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo">
            </a>
          </div>
          <h1>Create account</h1>
          <p>We will be happy to count you among us!</p>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col">
          <div class="form-container">
            <div class="form-header">
              Please fill in all fields to register
            </div>
            <div class="form-body">
              <form @submit.prevent="handleSignup">
                <div v-if="error"  class="alert alert-danger" role="alert">{{ error }}</div>

                <label for="firstname">Firstname :</label>
                <input id="firstname" type="text" class="form-control" v-model="newUser.firstname" placeholder="John" required>

                <label for="lastname">Lastname :</label>
                <input id="lastname" type="text" class="form-control" v-model="newUser.lastname" placeholder="Doe" required>

                <label for="email">Email :</label>
                <input id="email" type="email" class="form-control" v-model="newUser.email" placeholder="JohnDoe@domain.com" required>

                <label for="password">Password :</label>
                <input id="password" type="password" class="form-control" v-model="newUser.password"  required>

                <label for="confirm_password">Confirmation password :</label>
                <input  id="confirm_password" type="password" class="form-control" v-model="newUser.confirmation_password"
                  required>

                <a href="/signin" class="float-start">
                  <i class="fa"><font-awesome-icon :icon="['fas', 'arrow-left']" /></i>Sign in
                </a>
                <b-button type="submit" class="btn float-end">Create account</b-button>
              </form>

            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 text-center">
          <a href="/">
            <i class="fa"><font-awesome-icon :icon="['fas', 'house']" /></i>Back to homepage
          </a>
        </div>
      </div>
    </main>

    <footer class="container mt-5">
      <div class="row">
        <div class="col-12 col-sm-6 text-center text-sm-start">
          <p>Copyrights &copy; 2024</p>
        </div>
        <div class="col-12 col-sm-6 text-center text-sm-end">
          <p>Powered by <a href="https://oclock.io/" target="_blank" title="O'clock">O'clock</a></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';
import { signup } from '@/api/user.js';

export default {
  name: 'SignUp',
  setup() {
    const error = ref(null);
    const newUser = {
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      confirmation_password: '',
    };
    return {
      error,
      newUser,
    };
  },
  methods: {
    validateEmail(mail) {
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regexEmail.test(mail);
    },

    validatePwd(pwd) {
      const regexPwd = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regexPwd.test(pwd);
    },

    async handleSignup() {
      try {
        if (!this.newUser.firstname || !this.newUser.lastname || !this.newUser.email || !this.newUser.password || !this.newUser.confirmation_password) {
          throw new Error('All fields are required.');
        }

        if (!this.validateEmail(this.newUser.email)) {
          throw new Error('The email address is not valid.');
        }

        if (!this.validatePwd(this.newUser.password)) {
          throw new Error('The password must contain at least 8 characters, including a number, a special character and an uppercase letter.');
        }

        if (this.newUser.password !== this.newUser.confirmation_password) {
          throw new Error('The password should match the confirmation password.');
        }

        await signup(this.newUser);
        this.$router.push({ name: 'sign in' });
      } catch (error) {
        error.data && error.data.status === 409 ? this.error = 'An error occurred. Please check your information and try again.'
          : this.error = error;
      }
    },
  },

};
</script>
