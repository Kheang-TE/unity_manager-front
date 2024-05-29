<template>
  <div class="background-wall"></div>
  <div class="signin">
    <header class="container">
      <div class="row">
        <div class="col">
          <div class="logo-container">
            <a href="/" rel="home"><img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo"></a>
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
                <input type="email"  v-model="email" class="form-control" name="email"  placeholder="Email">
                <input type="password" v-model="password" class="form-control" name="password" placeholder="Password">
                <a href="/signup" class="float-start"><i class="fa"><font-awesome-icon :icon="['fas', 'arrow-left']" /></i>Create account</a>
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
import { signin } from '../api/user.js';
import useUserStore from '@/store/user.store';

export default {
  setup() {
    const store = useUserStore();
    return { store };
  },
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    /**
     * Handles the sign-in process by calling the signin API with the provided email and password.
     * If the sign-in is successful, it redirects the user to the 'board' route.
     *
     * @return {Promise<void>} A promise that resolves when the sign-in process is complete.
     */
    handleSignin() {
      signin(this.email, this.password).then((response) => {
        useUserStore().setUser(response);
        this.$router.push({ name: 'board' });
      });
    },
  },
};
</script>
