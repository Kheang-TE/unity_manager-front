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
                  <b-form-textarea
                    v-model="this.editCard.content"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group label="Select Tag Color">
                  <ul class="tag-list-color">
                    <li
                      v-for="color in colors"
                      :key="color.color"
                      class="tag-list-item"
                    >
                      <label
                        :style="{ backgroundColor: color.color }"
                        class="btn tag-color-button"
                      >
                        <input
                          type="checkbox"
                          name="tag"
                          :value="color.name"
                          @click="
                            [
                              selectColor({
                                name: color.name,
                                color: color.color,
                              }),
                              selectedTags(),
                            ]
                          "
                        />
                        {{ color.name }}
                      </label>
                    </li>
                  </ul>
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
    <div class="tag">
      <span class="tag-name">Urgent</span>
    </div>
  </b-card>
</template>

<script>
import { createCard, deleteCard, updateCard } from '@/api/card.js';
import { createTag } from '@/api/tag.js';

export default {
  name: 'Card',
  setup() {
    const newCard = {};
    const editCard = {};
    const colors = [
      { name: 'URGENT', color: '#AE2E25' },
      { name: 'OPTIONAL', color: '#7F5F01' },
      { name: 'IMPORTANT', color: '#A54800' },
      { name: 'REVIEW', color: '#0055CC' },
      { name: 'COOL', color: '#216E4E' },
      { name: 'HOLIDAY', color: '#5E4DB2' },
    ];
    const tags = [];
    const selectedTags = () => {
      const allTags = document.querySelectorAll('input[name="tag"]:checked');
      console.log(allTags);
    };

    return {
      editCard,
      newCard,
      colors,
      tags,
      selectedTags,
    };
  },

  props: {
    card: {
      type: Object,
      default: null,
    },
  },

  methods: {
    async selectColor(color) {
      this.newCard.code_color = color;

      console.log(this.newCard.code_color);
    },
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

<style scoped>
.tag {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #ff000d; /* Change this to the desired color */
  color: white;
  border-radius: 5px;
}

.tag-name {
  font-size: 11px;
  font-weight: bold;
  margin: 0.25rem 0.25rem;
}
</style>
