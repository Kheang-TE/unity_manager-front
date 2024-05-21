<template>
  <b-dropdown id="dropdown">
    <template #button-content>
      <font-awesome-icon :icon="['fas', 'circle-user']" />
    </template>
    <b-dropdown-item><font-awesome-icon :icon="['fas', 'circle-user']" /> JohnDoe@domain.com</b-dropdown-item>
    <b-dropdown-item>
      <b-link v-b-modal.account>
        <font-awesome-icon :icon="['fas', 'gear']" /> Account Setting
      </b-link>
      <b-modal id="account" centered>
        <template #title>
          Account Setting
        </template>
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
  export default {
    name: 'DropdownUser',
  }
</script>