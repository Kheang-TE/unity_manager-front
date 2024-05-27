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
            <b-modal
              :id="'edit-list-' + list.id.toString()"
              centered
              @ok="submitUpdateList(list.id)"
            >
              <template #title> Edit list : {{ list.name }} </template>
              <b-form @submit.prevent="submitUpdateList(list.id)">
                <b-form-group label="List Name">
                  <b-form-input v-model="list.name"></b-form-input>
                </b-form-group>
              </b-form>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-list-' + list.id.toString()"
              >Delete</b-link
            >
            <b-modal
              :id="'delete-list-' + list.id.toString()"
              centered
              @ok="deleteList(list.id)"
            >
              <template #title> Delete list : {{ list.name }} </template>
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
      <draggable
        v-model="list.cards"
        class="card-container"
        group="cards"
        v-bind="dragOptions"
      >
        <template #item="{ element: card }">
          <Card :card="card" />
        </template>
      </draggable>

      <b-button class="add-card" v-b-modal="'add-card-list-' + list.id"
        >[+] Add new card</b-button
      >
      <b-modal
        :id="'add-card-list-' + list.id"
        centered
        @ok="submitAddCard(list.id)"
      >
        <template #title> Add Card to List: {{ list.name }} </template>
        <b-form @submit.prevent="submitAddCard(list.id)">
          <b-form-group label="Card Title">
            <b-form-input v-model="newCardTitle"></b-form-input>
          </b-form-group>
          <b-form-group label="Card Description">
            <b-form-textarea v-model="newCardDescription"></b-form-textarea>
          </b-form-group>
        </b-form>
      </b-modal>
    </b-collapse>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Card from '@/components/boardComponents/Card.vue';
import { createList, deleteList, updateList } from '@/api/list.js';

export default {
  name: 'List',
  props: {
    list: {
      type: Object,
      default: null,
    },
    projectId: {
      type: Number,
    },
  },
  components: {
    draggable,
    Card,
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'cards',
        disabled: false,
      };
    },
  },
  methods: {
    async addList() {
      try {
        const newId = this.list.length + 1;
        console.log(newId);
        const newList = {
          id: newId,
          name: `List ${newId}`,
          position: 1,
          code_color: '',
          project_id: this.projectId,
        };

        const createdList = await createList(newList);

        if (createdList) {
          this.list.push(createdList);
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
          const index = this.list.findIndex((l) => l.id === listId);
          if (index !== -1) {
            this.list.splice(index, 1);
          }
        } else {
          console.error('Error deleting the list');
        }
      } catch (error) {
        console.error('Error deleting the list:', error);
      }
    },
    async submitUpdateList(listId) {
      try {
        const index = this.list.findIndex((l) => l.id === listId);
        if (index !== -1) {
          const updatedList = await updateList(listId, {
            name: this.list[index].name,
          });
          if (updatedList) {
            this.list[index] = updatedList;
          } else {
            console.error('Error updating the list');
          }
        } else {
          console.error('List not found');
        }
      } catch (error) {
        console.error('Error updating the list:', error);
      }
    },
  },
};
</script>
