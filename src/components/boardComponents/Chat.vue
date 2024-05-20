<template>
  <b-offcanvas id="chat" placement="end" :backdrop="false">
    <template #title>
      Collaborators
      <b-button v-b-modal.new-collaborator>
        <font-awesome-icon :icon="['fas', 'plus']" />
      </b-button>
      <b-modal id="new-collaborator" centered>
        <template #title>
          Add new collaborator
        </template>

      </b-modal>
    </template>
  </b-offcanvas>
</template>

<script>
export default {
  name: 'Chat',
};
</script>
