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
            <b-modal :id="'edit-card-' + card.id.toString()" centered @show="setEditCard()" @ok="updateCard(card)">
              <!-- Edit the card -->
              <template #title> Edit card</template>
              <b-form @submit.prevent="updateCard(card)">
                <b-form-group label="Card Title">
                  <b-form-input v-model="editedCard.name"></b-form-input>
                </b-form-group>
                <b-form-group label="Card Description">
                  <b-form-textarea v-model="editedCard.content"></b-form-textarea>
                </b-form-group>
                <b-form-group label="Select Tag">
                  <ul class="tag-list">
                    <li v-for="tag in boardStore.tags" :key="tag.id" class="tag-item">
                      <label :style="{ backgroundColor: tag.code_color }" class="btn tag-item-button">
                        <input type="checkbox" v-model="editedCard.tags" :value="tag" @click="selectedTag(card.id)" />
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
    <div class="tagscard">
      <span v-for="tag in card.tags" class="tagscard-item" :style="'background-color:' + tag.code_color">{{ tag.name
        }}</span>
    </div>
  </b-card>
</template>

<script>
import useBoardStore from '@/store/board.store';
import useTagStore from '@/store/tag.store.js';

import {
  createCard,
  deleteCard,
  updateCard,
  // updateCardTags,
} from '@/api/card.js';

export default {
  name: 'Card',
  setup() {
    const boardStore = useBoardStore();
    const tagStore = useTagStore();
    const newCard = {};
    const editedCard = {
      tags: [],
      name: '',
      content: '',
    };

    return {
      boardStore,
      tagStore,
      newCard,
      editedCard,
    };
  },

  props: {
    card: {
      type: Object,
      default: null,
    },
    list_id: {
      type: Number,
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
      try {
        const { selectTags } = this.editedCard;
        const editCard = {
          id: card.id,
          name: this.editedCard.name,
          position: card.position,
          content: this.editedCard.content,
          list_id: card.list_id,
          tags: selectTags,
        };

        await updateCard(editCard);
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

    setEditCard() {
      this.editedCard.name = this.card.name;
      this.editedCard.content = this.card.content;
      this.editedCard.tags = this.card.tags;
    },

    selectedTag(cardId) {
      const modal = document.getElementById(`edit-card-${cardId}`);
      this.editedCard.selectTags = [];
      modal.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        this.editedCard.selectTags.push(checkbox._value.id);
      });
    },
  },
};
</script>

<style scoped>
.tagscard {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  border-radius: 5px;
}

.tagscard-item {
  font-size: 11px;
  font-weight: bold;
  border-radius: .25rem;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem 0.25rem;
}

.tag-list-color {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
</style>
