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
              @ok="updateCard(card.id)"
            >
              <template #title> Edit card : {{ card.name }} </template>
              <b-form @submit.prevent="updateCard(card.id)">
                <b-form-group label="Card Title">
                  <b-form-input v-model="card.name"></b-form-input>
                </b-form-group>
                <b-form-group label="Card Description">
                  <b-form-textarea v-model="card.description"></b-form-textarea>
                </b-form-group>
              </b-form>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-card-' + card.id.toString()"
              >Delete</b-link
            >
            <b-modal
              :id="'delete-card-' + card.id.toString()"
              centered
              @ok="deleteCard(card.id)"
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

  props: {
    card: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      card: {
        id: 0,
        name: '',
        content: '',
        position: 0,
        list_id: 0,
      },
    };
  },

  methods: {
    async submitAddCard(listId) {
      try {
        const listIndex = this.project.lists.findIndex(
          (list) => list.id === listId
        );
        if (listIndex !== -1) {
          const newCard = {
            name: card.name,
            position: 1,
            content: card.content,
            list_id: listId,
          };
          const createdCard = await createCard(newCard);
          if (createdCard) {
            this.project.lists[listIndex].cards.push(createdCard);
          } else {
            console.error('Error creating the card');
          }
        } else {
          console.error('List not found');
        }
      } catch (error) {
        console.error('Error creating the card:', error);
      }
    },

    async updateCard(cardId) {
      try {
        const index = this.project.cards.findIndex((c) => c.id === cardId);
        if (index !== -1) {
          const updatedCard = await updateCard(cardId, {
            name: this.project.cards[index].name,
          });
          if (updatedCard) {
            this.project.cards[index] = updatedCard;
          } else {
            console.error('Error updating the card');
          }
        } else {
          console.error('card not found');
        }
      } catch (error) {
        console.error('Error updating the card:', error);
      }
    },

    async deleteCard(cardId) {
      try {
        const deletedCard = await deleteCard(cardId);
        if (deletedCard) {
          const index = this.project.cards.findIndex((c) => c.id === cardId);
          console.log(cardId);
          if (index !== -1) {
            this.project.cards.splice(index, 1);
          }
        } else {
          console.error('Error deleting card');
        }
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    },
  },
};
</script>
