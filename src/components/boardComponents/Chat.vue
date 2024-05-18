<template>
  <b-offcanvas id="chat" placement="end" :backdrop="false">
    <template #title>
      Collaborators
      <b-button><font-awesome-icon :icon="['fas', 'plus']" /></b-button>
    </template>
  </b-offcanvas>
</template>

<script>
export default {
  name: 'Chat',
}
</script>