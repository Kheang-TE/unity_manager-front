<template>
  <b-dropdown id="dropdown">
    <template #button-content>
      <font-awesome-icon :icon="['fas', 'circle-user']" />
    </template>
    <b-dropdown-item>
      <font-awesome-icon :icon="['fas', 'circle-user']" />
      {{ fullname }}
    </b-dropdown-item>
    <b-dropdown-item>
      <b-link v-b-modal.account>
        <font-awesome-icon :icon="['fas', 'gear']" /> Account Setting
      </b-link>
      <b-modal id="account" size="xl" title="Account Setting" centered @ok="submitUpdateUser">
        <b-accordion>
          <b-form-group @submit.prevent="submitUpdateUser">
            <b-accordion-item title="Profile" visible>
              <label for="email">Email :</label>
              <b-form-input id="email" type="text" v-model="user.email" disabled></b-form-input>
              <label for="firstname">Firstname:</label>
              <b-form-input id="firstname" type="text" v-model="user.firstname"></b-form-input>
              <label for="lastname">Lastname:</label>
              <b-form-input id="lastname" type="text" v-model="user.lastname"></b-form-input>
            </b-accordion-item>
            <b-accordion-item title="Change password">
              <label for="password">Enter new password:</label>
              <b-form-input id="password" type="password" v-model="user.new_password"></b-form-input>
              <label for="confirm_password">Confirm new password:</label>
              <b-form-input id="confirm_password" type="password"
                v-model="user.confirmation_new_password"></b-form-input>
              <label for="code_color">Code color:</label>
              <b-form-input id="code_color" type="color" placeholder="#ff0000" v-model="user.code_color"></b-form-input>
            </b-accordion-item>
            <b-row class="mt-4">
              <b-col>
                <label for="actual_password">Enter your actual password for validate the changes:</label>
                <b-form-input id="actual_password" type="password" v-model="user.actual_password"></b-form-input>
              </b-col>
            </b-row>
          </b-form-group>
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
import { computed } from 'vue';
import useUserStore from '@/store/user.store.js';
import { updateUser, signOut } from '@/api/user.js';
import handleTokenExpiry from '@/utils/handleTokenExpiry';

export default {
  setup() {
    const userStore = useUserStore();
    const user = computed(() => userStore.getUser);
    const fullname = computed(() => userStore.fullname);
    const editUser = {};
    return {
      userStore, user, fullname, editUser,
    };
  },
  methods: {
    async submitUpdateUser() {
      try {
        const userData = {
          id: this.user.id,
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          code_color: this.user.code_color,
          new_password: this.user.new_password,
          confirmation_new_password: this.user.confirmation_new_password,
          actual_password: this.user.actual_password,
        };
        console.log('Updating user with data:', userData);
        const response = await updateUser(userData);
        if (response) {
          console.log('User updated successfully');
          this.userStore.setUser(userData);
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error updating the user info:', error);
      }
    },

    async signOutUser() {
      try {
        console.log('Sign out user with ID:', this.userStore.user.id);
        const response = await signOut();
        console.log('response :', response);
        if (response) {
          handleTokenExpiry();
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
