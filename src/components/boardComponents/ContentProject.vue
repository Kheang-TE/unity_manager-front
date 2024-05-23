<template>
  <div v-if="project" v-for="list in project.lists" class="list">
    <!-- TODO : SOC -->
    <div class="list-header">
      <h2>{{ list.name }}</h2>
      <div class="list-controls">
        <b-dropdown no-caret>
          <template #button-content>
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
          </template>
          <b-dropdown-item>
            <b-link v-b-modal="'edit-list-' + list.id.toString()">Edit</b-link>
            <b-modal :id="'edit-list-' + list.id.toString()" centered>
              <template #title> Edit list : {{ list.name }} </template>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-list-' + list.id.toString()"
              >Delete</b-link
            >
            <b-modal
              :id="'delete-list-' + list.id.toString()"
              centered
              hide-footer
            >
              <template #title>Delete list : {{ list.name }}</template>
              <p>Are you sure you want to delete this list ?</p>

              <b-button variant="danger" @click="deleteList(list.id)"
                >OK</b-button
              >
            </b-modal>
          </b-dropdown-item>
        </b-dropdown>
        <b-button v-b-toggle="list.id.toString()" variant="none">
          <font-awesome-icon :icon="['fas', 'angle-up']" />
        </b-button>
      </div>
    </div>

    <b-collapse :id="list.id.toString()" class="list-body" visible>
      <b-card v-for="card in list.cards">
        <div class="card-header">
          <h5>{{ card.name }}</h5>
          <div class="card-controls">
            <b-dropdown no-caret>
              <template #button-content>
                <font-awesome-icon :icon="['fas', 'ellipsis']" />
              </template>
              <b-dropdown-item>
                <b-link v-b-modal="'edit-card-' + card.id.toString()"
                  >Edit</b-link
                >
                <b-modal :id="'edit-card-' + card.id.toString()" centered>
                  <template #title> Edit card : {{ card.name }} </template>
                </b-modal>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-link v-b-modal="'delete-card-' + card.id.toString()"
                  >Delete</b-link
                >
                <b-modal :id="'delete-card-' + card.id.toString()" centered>
                  <template #title> Delete card : {{ card.name }} </template>
                  <p>Are you sure you want to delete this card ?</p>
                </b-modal>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <p>{{ card.description }}</p>
      </b-card>
    </b-collapse>
  </div>
  <a class="list new-list" @click.prevent="addList">
    <div class="list-body">
      <font-awesome-icon :icon="['fas', 'plus']" />[ Add new list ]
    </div>
  </a>
</template>

<script>
import { createList, deleteList, updateList } from '@/api/list.js';
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async addList() {
      try {
        console.log(newId);
        const newId = this.project.lists.length + 1;
        const newList = {
          id: newId,
          name: `List ${newId}`,
          position: 1,
          code_color: '',
          project_id: this.project.id,
        };
        const createdList = await createList(newList);

        if (createdList) {
          this.project.lists.push(createdList);
        } else {
          console.error('Error creating the list');
        }
      } catch (error) {
        console.error('Error creating the list :', error);
      }
    },

    async deleteList(listId) {
      try {
        const deletedList = await deleteList(listId);
        if (deletedList) {
          const index = this.project.lists.findIndex((l) => l.id === listId);
          if (index !== -1) {
            this.project.lists.splice(index, 1);
          }
        } else {
          console.error('Error deleting the list');
        }
      } catch (error) {
        console.error('Error deleting the list:', error);
      }
    },
  },
  data() {
    return {
      listToDelete: null,
    };
  },
};
</script>
