<template>
  <div class="background-wall"></div>
  <div class="signin">
    <header class="container">
      <div class="row">
        <div class="col">
          <div class="logo-container">
            <a href="/" rel="home"><img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager"
                class="logo"></a>
          </div>
          <h1>Connect</h1>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <div class="form-container">
            <div class="form-header">
              Log in to access your projects
            </div>
            <div class="form-body">
              <form @submit.prevent="handleSignin">
                <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
                <label for="email">Email :</label>
                <input type="email"  v-model="email" class="form-control" name="email"  placeholder="JohnDoe@domain.com" aria-required="true" required>
                <label for="password">Password :</label>
                <input type="password" v-model="password" class="form-control" name="password" aria-required="true" required>
                <a href="/signup" class="float-start"><i class="fa"><font-awesome-icon
                      :icon="['fas', 'arrow-left']" /></i>Create account</a>
                <button type="submit" class="btn float-end">Connect</button>
              </form>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-12 text-center">
            <a href="/"><i class="fa"><font-awesome-icon :icon="['fas', 'house']" /></i>Back to homepage</a>
          </div>
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
import { signin } from '../api/user.js';
import useUserStore from '@/store/user.store';

export default {
  setup() {
    const store = useUserStore();
    const error = ref(null);
    return { store, error };
  },
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
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

    handleSignin() {
      if (this.email === '' || this.password === '') {
        this.error = 'Please fill in all fields';
        return;
      }
      if (!this.validateEmail(this.email)) {
        this.error = 'Please enter a valid email';
        return;
      }
      if (!this.validatePwd(this.password)) {
        this.error = 'Password must contain at least 8 characters, one uppercase letter, one number and one special character';
        return;
      }
      signin(this.email, this.password).then((response) => {
        this.store.setUser(response);
        this.$router.push({ name: 'board' });
      }).catch((error) => {
        this.error = error.data.error;
      });
    },
  },
};
</script>
