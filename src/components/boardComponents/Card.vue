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
            <b-modal
              :id="'edit-card-' + card.id.toString()"
              centered
              @ok="updateCardFromDatabase(card)"
            >
            <!-- Edit the card -->
              <template #title> Edit card : {{ card.name }} </template>
              <b-form @submit.prevent="updateCardFromDatabase(card)">
                <b-form-group label="Card Title">
                  <b-form-input v-model="this.editCard.name"></b-form-input>
                </b-form-group>
                <b-form-group label="Card Description">
                  <b-form-textarea v-model="this.editCard.content"></b-form-textarea>
                </b-form-group>
              </b-form>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-card-' + card.id.toString()"
              >Delete</b-link
            >
            <!-- Delete the card -->
            <b-modal
              :id="'delete-card-' + card.id.toString()"
              centered
              @ok="deleteCardFromDatabase(card.id)"
            >
              <template #title> Delete card : {{ card.name }} </template>
              <p>Are you sure you want to delete this card ?</p>
            </b-modal>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <p>{{ card.content }}</p>
  </b-card>
</template>

<script>
import { createCard, deleteCard, updateCard } from '@/api/card.js';

export default {
  name: 'Card',
  setup() {
    const newCard = {};
    const editCard = {};
    return {
      editCard,
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

    async updateCardFromDatabase(card) {
      console.log('card', card);
      try {
        const editCard = {
          id: card.id,
          name: this.editCard.name,
          position: 1,
          content: this.editCard.content,
          list_id: card.list_id,
        };
        console.log(editCard);
        await updateCard(editCard);
      } catch (error) {
        console.error('Error updating the card:', error);
      }
    },

    async deleteCardFromDatabase(cardId) {
      try {
        await deleteCard(cardId);
        console.log(`Card with ID ${cardId} deleted`);
      } catch (error) {
        console.error(`Error deleting card with ID ${cardId}:`, error);
      }
    },
  },
};
</script>
