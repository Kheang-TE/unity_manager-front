<template>
  <b-dropdown id="dropdown">
    <template #button-content>
      <font-awesome-icon :icon="['fas', 'circle-user']" />
    </template>
    <b-dropdown-item>
      <font-awesome-icon :icon="['fas', 'circle-user']" /> {{ store.user.lastname }} {{ store.user.firstname }}
    </b-dropdown-item>
    <b-dropdown-item>
      <b-link v-b-modal.account>
        <font-awesome-icon :icon="['fas', 'gear']" /> Account Setting
      </b-link>
      <b-modal id="account" size="xl" title="Account Setting" centered @ok="submitUpdateUser">
        <b-accordion>
          <b-form @submit.prevent="submitUpdateUser" >
          <b-accordion-item title="Profile" visible>
            <label for="email">Email :</label>
            <b-form-input id="email" type="text" v-model="store.user.email" disabled ></b-form-input>
            <label for="lastname">Lastname:</label>
            <b-form-input id="lastname" type="text" v-model="store.user.lastname"></b-form-input>
            <label for="firstname">Firstname:</label>
            <b-form-input id="firstname" type="text" v-model="store.user.firstname" ></b-form-input>
          </b-accordion-item>
          <b-accordion-item title="Change password">
            <label for="password">Enter new password:</label>
            <b-form-input id="password" type="password" v-model="store.user.password"></b-form-input>
            <label for="confirm_password">Confirm new password:</label>
            <b-form-input id="confirm_password" type="password" v-model="store.user.confirmation"></b-form-input>
          </b-accordion-item>
          </b-form>
        </b-accordion>
      </b-modal>
    </b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item>
      <b-link v-b-modal.signout>
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Sign out
      </b-link>
      <b-modal id="signout" centered @ok="signOutUser">
        <template #title>
          Sign out
        </template>
        <p>Are you sure you want to sign out ?</p>
      </b-modal>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { useUserStore } from '@/store/user.store.js';
import { updateUser } from '@/api/user.js';
import { signOut } from '@/api/user.js';

export default {
  setup() {
    const store = useUserStore();
    return { store };
  },
  methods: {
    async submitUpdateUser() {
      try {
        const userData = {
          id: this.store.user.id,
          lastname: this.store.user.lastname,
          firstname: this.store.user.firstname,
          password: this.store.user.password,
          confirmation: this.store.user.confirmation,
          code_color: this.store.user.code_color,
        };
        console.log('Updating user with ID:', userData.id);
        const response = await updateUser(userData);
        if (response) {
          console.log('User updated successfully');
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error updating the user info:', error);
      }
    },

    async signOutUser() {
      try {
        console.log('Sign out user with ID:', this.store.user.id);
        const response = await signOut(this.store.user.id);
        if (response === true) {
          console.log('User signed out successfully');
          this.store.$reset();          
          this.$router.push({ name: 'sign in' });
        } else {
          console.error('Failed to sign out user');
        }
      } catch (error) {
        console.error('Error signing out user:', error);
      }
    },
  },
};
</script>