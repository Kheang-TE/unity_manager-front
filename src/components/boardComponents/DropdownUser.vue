<template>
  <b-dropdown id="dropdown">
    <template #button-content>
      <font-awesome-icon :icon="['fas', 'circle-user']" />
    </template>
    <b-dropdown-item><font-awesome-icon :icon="['fas', 'circle-user']" /> JohnDoe@domain.com</b-dropdown-item>
    <b-dropdown-item><font-awesome-icon :icon="['fas', 'gear']" /> Account Setting</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item><font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Sign out</b-dropdown-item>
  </b-dropdown>
</template>

<script>
  export default {
    name: 'DropdownUser',
  }
</script>