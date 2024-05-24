<template>
  <b-card>
    <div class="card-header">
      <h5>{{ card.name }}</h5>
      <div class="card-controls">
        <b-dropdown no-caret>
          <template #button-content>
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
          </template>
          <b-dropdown-item>
            <b-link v-b-modal="'edit-card-' + card.id.toString()">Edit</b-link>
            <b-modal :id="'edit-card-' + card.id.toString()" centered>
              <template #title>
                Edit card : {{ card.name }}
              </template>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-card-' + card.id.toString()">Delete</b-link>
            <b-modal :id="'delete-card-' + card.id.toString()" centered>
              <template #title>
                Delete card : {{ card.name }}
              </template>
              <p>Are you sure you want to delete this card ?</p>
            </b-modal>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <p>{{ card.description }}</p>
  </b-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      default: null,
    },
  },
};
</script>
