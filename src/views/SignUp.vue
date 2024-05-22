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
              <b-form @submit.prevent="handleSignup">
                <input type="text" class="form-control" v-model="lastname" placeholder="Lastname" required>
                <input type="text" class="form-control" v-model="firstname" placeholder="Firstname" required>
                <input type="email" class="form-control" v-model="email" placeholder="Email" required>
                <input type="password" class="form-control" v-model="password" placeholder="Password" required>
                <input type="password" class="form-control" v-model="confirm_password" placeholder="Confirm password"
                  required>
                <a href="/signin" class="float-start">
                  <i class="fa"><font-awesome-icon :icon="['fas', 'arrow-left']" /></i>Sign in
                </a>
                <b-button type="submit" class="btn float-end">Create account</b-button>
              </b-form>
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
    const lastname = ref('');
    const firstname = ref('');
    const email = ref('');
    const password = ref('');
    const confirm_password = ref('');

    const validateEmail = (mail) => {
      const regexEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
      return regexEmail.test(mail);
    };

    const validatePwd = (pwd) => {
      const regexPwd = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regexPwd.test(pwd);
    };

    const handleSignup = async () => {
      if (!lastname.value || !firstname.value || !email.value || !password.value || !confirm_password.value) {
        console.log('Veuillez remplir tous les champs.');
        return;
      }

      if (!validateEmail(email.value)) {
        console.log('Veuillez saisir une adresse email valide.');
        return;
      }

      if (!validatePwd(password.value)) {
        console.log('Veuillez saisir un mot de passe d\'une longueur minimale de 8 caractères dont une majuscule, un chiffre et un caractère spécial.');
        return;
      }

      if (password.value !== confirm_password.value) {
        console.log('Veuillez saisir des mots de passe identique.');
        return;
      }

      const newUser = {
        lastname: lastname.value,
        firstname: firstname.value,
        email: email.value,
        password: password.value,
        confirmation: confirm_password.value,
      };

      await signup(newUser);
    };

    return {
      lastname,
      firstname,
      email,
      password,
      confirm_password,
      handleSignup,
    };
  },
};
</script>
