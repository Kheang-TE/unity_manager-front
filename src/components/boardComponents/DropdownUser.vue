<template>
  <b-dropdown id="dropdown">
    <template #button-content>
      <font-awesome-icon :icon="['fas', 'circle-user']" />
    </template>
    <b-dropdown-item>
      <font-awesome-icon :icon="['fas', 'circle-user']" /> JohnDoe@domain.com
    </b-dropdown-item>
    <b-dropdown-item>
      <b-link v-b-modal.account>
        <font-awesome-icon :icon="['fas', 'gear']" /> Account Setting
      </b-link>
      <b-modal id="account" size="xl" title="Account Setting" centered>
        <b-accordion>
          <b-accordion-item title="Profile" visible>
            <label for="email"> Email :</label>
            <b-form-input id="email" :type="text" v-model="email" disabled></b-form-input>
            <label for="lastname"> Lastname</label>
            <b-form-input id="lastname" :type="text" v-model="lastname"></b-form-input>
            <label for="firstname"> Firstname</label>
            <b-form-input id="firstname" :type="text" v-model="firstname"></b-form-input>
          </b-accordion-item>
          <b-accordion-item title="Change password">
            <label for="password">Enter new password</label>
            <b-form-input id="password" :type="password"></b-form-input>
            <label for="confirm_password">Confirm new password</label>
            <b-form-input id="confirm_password" :type="password"></b-form-input>
          </b-accordion-item>
        </b-accordion>
      </b-modal>
    </b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item>
      <b-link v-b-modal.signout>
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Sign out
      </b-link>
      <b-modal id="signout" centered>
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

export default {
  setup() {
    const store = useUserStore();
    return { store };
  },
  data() {
    return {
      email: 'johnDoe@domain.com',
      lastname: 'John',
      firstname: 'Doe',
    };
  },
};
</script>
