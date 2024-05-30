<template>
  <div class="list">
    <div class="list-header" :style="{ 'background-color': list.code_color }">
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
              @ok="submitUpdateList(list)"
            >
              <template #title> Edit list : {{ list.name }} </template>
              <b-form @submit.prevent="submitUpdateList(list)">
                <b-form-group label="List Name">
                  <b-form-input
                    v-model="this.editList.name"
                    id="name"
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="List Color">
                  <b-form-input
                    type="color"
                    v-model="this.editList.code_color"
                  ></b-form-input>
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
              @ok="deleteListFromDatabase(list.id)"
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
            <b-form-input v-model="newCard.name"></b-form-input>
          </b-form-group>
          <b-form-group label="Card Description">
            <b-form-textarea v-model="newCard.content"></b-form-textarea>
          </b-form-group>
          <b-form-group label="Select Tag Color">
            <ul class="tag-list-color">
              <li
                :style="{ 'background-color': color.code }"
                v-for="(color, index) in colors"
                :key="index"
                @click="selectColor(color)"
                :class="{ selected: color === selectedColor }"
              ></li>
            </ul>
          </b-form-group>
          <b-form-group label="Create a new tag">
            <font-awesome-icon :icon="['fas', 'pen']" />
          </b-form-group>
        </b-form>
      </b-modal>
    </b-collapse>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Card from '@/components/boardComponents/Card.vue';
import { deleteList, updateList } from '@/api/list.js';
import { createCard } from '@/api/card.js';

export default {
  name: 'List',
  setup() {
    const newCard = {};
    const editList = {};
    const colors = [
      { name: 'Red Orange', code: '#FF5733' },
      { name: 'Lime Green', code: '#33FF57' },
      { name: 'Royal Blue', code: '#3357FF' },
      { name: 'Goldenrod', code: '#F0A202' },
      { name: 'Turquoise', code: '#03C6C7' },
      { name: 'Crimson', code: '#C70039' },
      { name: 'Dark Magenta', code: '#900C3F' },
      { name: 'Purple', code: '#581845' },
      { name: 'Sunflower', code: '#FFC300' },
      { name: 'Light Green', code: '#DAF7A6' },
    ];
    return {
      newCard,
      editList,
      colors,
    };
  },
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
    selectColor(color) {
      this.selectedColor = color;

      // Ajoutez ici votre logique pour utiliser la couleur sélectionnée
    },
    async submitAddCard(id) {
      try {
        const newCard = {
          name: this.newCard.name,
          position: 1,
          content: this.newCard.content,
          list_id: id,
        };
        await createCard(newCard);
      } catch (error) {
        console.error('Error creating the card :', error);
      }
    },

    async deleteListFromDatabase(listId) {
      try {
        await deleteList(listId);
        console.log(`List with ID ${listId} deleted`);
      } catch (error) {
        console.error('Error deleting the list:', error);
      }
    },
    async submitUpdateList(list) {
      try {
        await updateList({
          id: list.id,
          name: this.editList.name,
          code_color: this.editList.code_color,
          position: 1,
          project_id: list.project_id,
        });
      } catch (error) {
        console.error('Error updating the list:', error);
      }
    },
  },
};
</script>

<style>
.color-list {
}
</style>
