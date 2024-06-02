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
            <b-modal :id="'edit-card-' + card.id.toString()" centered @ok="updateCard(card)">
              <!-- Edit the card -->
              <template #title> Edit card</template>
              <b-form @submit.prevent="updateCard(card)">
                <b-form-group label="Card Title">
                  <b-form-input v-model="card.name"></b-form-input>
                </b-form-group>
                <b-form-group label="Card Description">
                  <b-form-textarea v-model="card.content"></b-form-textarea>
                </b-form-group>
                <b-form-group label="Select Tag">
                  <ul class="tag-list">
                    <li v-for="tag in boardStore.tags" :key="tag.id" class="tag-item">
                      <label :style="{ backgroundColor: tag.code_color }" class="btn tag-item-button">
                        <input type="checkbox" name="tag" v-model="card.tags" :value="tag" @click="selectedTags" />
                        {{ tag.name }}
                      </label>
                    </li>
                  </ul>
                </b-form-group>
              </b-form>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-card-' + card.id.toString()">Delete</b-link>
            <!-- Delete the card -->
            <b-modal :id="'delete-card-' + card.id.toString()" centered @ok="deleteCard(card.id)">
              <template #title> Delete card : {{ card.name }} </template>
              <p>Are you sure you want to delete this card ?</p>
            </b-modal>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <p>{{ card.content }}</p>
    <div class="tag">
      <!-- <span class="tag-name">Urgent</span> -->
    </div>
  </b-card>
</template>

<script>
import useBoardStore from '@/store/board.store';
import useTagStore from '@/store/tag.store.js';
import { getListByProject } from '@/api/list.js';
import { getTagsByProject } from '@/api/tag.js';

import {
  createCard,
  deleteCard,
  updateCard,
  updateCardTags,
} from '@/api/card.js';

export default {
  name: 'Card',
  setup() {
    const boardStore = useBoardStore();
    const tagStore = useTagStore();
    const newCard = {};

    return {
      boardStore,
      tagStore,
      newCard,
    };
  },

  props: {
    card: {
      type: Object,
      default: null,
    },
  },

  methods: {
    async submitAddCard(listId) {
      try {
        const newCard = {
          name: this.newCard.name,
          position: 1,
          content: this.newCard.content,
          list_id: listId,
        };

        await createCard(newCard);
      } catch (error) {
        console.error('Error creating the card:', error);
      }
    },

    async updateCard(card) {
      console.log('card', card);
      const tags = this.tagStore.selectedTags;
      console.log('tags : ', tags);
      try {
        const editCard = {
          id: card.id,
          name: card.name,
          position: card.position,
          content: card.content,
          list_id: card.list_id,
        };
        await updateCard(editCard);
        await updateCardTags(editCard, tags);
      } catch (error) {
        console.error('Error updating the card:', error);
      }
    },

    async deleteCard(cardId) {
      try {
        await deleteCard(cardId);
        console.log(`Card with ID ${cardId} deleted`);
      } catch (error) {
        console.error(`Error deleting card with ID ${cardId}:`, error);
      }
    },

    selectedTags() {
      const allTags = document.querySelectorAll('input[name="tag"]:checked');
      this.tagStore.setSelectedTags(allTags);
      console.log(this.tagStore.selectedTags);
    },

    async refreshBoard() {
      this.boardStore.selectedProject.lists = await getListByProject(this.boardStore.selectedProject.id);
      this.boardStore.selectedProject.tags = await getTagsByProject(this.boardStore.selectedProject.id);
    },
  },
};
</script>

<style scoped>
.tag-list {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.tag-item {
  margin: 0.25rem;
}

.tag-item input[type="checkbox"] {
  margin-right: 0.25rem;
}

.tag-item-button {
  font-weight: bold;
  font-size: 10px;
  color: white;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s;
}

.tag-item-button:hover {
  color: white;
  cursor: pointer;
  transform: scale(1.2);
}

.tag {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #ff000d;
  /* Change this to the desired color */
  color: white;
  border-radius: 5px;
}

.tag-name {
  font-size: 11px;
  font-weight: bold;
  margin: 0.25rem 0.25rem;
}

.tag-list-color {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
</style>
