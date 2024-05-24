<template>
  <div class="list">
    <div class="list-header">
      <h2>{{ list.name }}</h2>
      <div class="list-controls">
        <b-dropdown no-caret>
          <template #button-content>
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
          </template>
          <b-dropdown-item>
            <b-link v-b-modal="'add-card-list-' + list.id">Add new card</b-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'edit-list-' + list.id.toString()">Edit</b-link>
            <b-modal :id="'edit-list-' + list.id.toString()" centered>
              <template #title>
                Edit list : {{ list.name }}
              </template>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-list-' + list.id.toString()">Delete</b-link>
            <b-modal :id="'delete-list-' + list.id.toString()" centered>
              <template #title>
                Delete list : {{ list.name }}
              </template>
              <p>Are you sure you want to delete this list ?</p>
            </b-modal>
          </b-dropdown-item>
        </b-dropdown>
        <b-button v-b-toggle="list.id.toString()" variant="none">
          <font-awesome-icon :icon="['fas', 'angle-up']" />
        </b-button>
      </div>
    </div>

    <b-collapse :id="list.id.toString()" class="list-body" visible>
      <draggable v-model="list.cards" class="card-container">
        <template #item="{ element: card }">
          <Card :card="card" />
        </template>
      </draggable>

      <b-button class="add-card" v-b-modal="'add-card-list-' + list.id">[+] Add new card</b-button>
      <b-modal :id="'add-card-list-' + list.id" title="Add new card to list" centered>
      </b-modal>
    </b-collapse>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Card from '@/components/boardComponents/Card.vue';

export default {
  name: 'List',
  props: {
    list: {
      type: Object,
      default: null,
    },
  },
  components: {
    draggable,
    Card,
  },
  // data() {
  //   return {
  //     projectSelected: null,
  //   };
  // },
  // methods: {
  //   updateProject(project) {
  //     this.projectSelected = project;
  //   },
  // },
};
</script>
