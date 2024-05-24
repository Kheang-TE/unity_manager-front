<template>
  <div v-if="project" v-for="list in project.lists" class="list" :key="list.id">
    <div v-if="project" v-for="card in list.cards" class="card" :key="card.id">
      <!-- Card Content -->
    </div>
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

        <!-- Bouton pour ajouter une carte -->
        <b-button
          variant="success"
          v-b-modal="'add-card-' + list.id.toString()"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
        </b-button>
        <!-- Modale pour ajouter une carte -->
        <b-modal
          :id="'add-card-' + list.id.toString()"
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
      </div>
    </div>

    <b-collapse :id="list.id.toString()" class="list-body" visible>
      <b-card v-for="card in list.cards" :key="card.id">
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
                      <b-form-textarea
                        v-model="card.description"
                      ></b-form-textarea>
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
        <p>{{ card.description }}</p>
      </b-card>

      <b-button class="add-card" v-b-modal="'add-card-list-' + list.id"
        >[+] Add new card</b-button
      >
      <b-modal
        :id="'add-card-list-' + list.id"
        title="Add new card to list"
        centered
      >
      </b-modal>
    </b-collapse>
  </div>

  <!-- Add new list -->
  <b-button class="new-list" v-b-modal.add-new-list>
    <font-awesome-icon :icon="['fas', 'plus']" />[ Add new list ]
  </b-button>
  <b-modal id="add-new-list" title="Add new list" centered @ok="addList">
  </b-modal>
</template>

<script>
import { createList, deleteList, updateList } from '@/api/list.js';
import { createCard, deleteCard, updateCard } from '@/api/card.js';
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newCardTitle: '',
      newCardDescription: '',
    };
  },
  methods: {
    async addList() {
      try {
        const newId = this.project.lists.length + 1;
        console.log(newId);
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
          console.error('Error creating list');
        }
      } catch (error) {
        console.error('Error creating list :', error);
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
          console.error('Error deleting list');
        }
      } catch (error) {
        console.error('Error deleting list:', error);
      }
    },
    async submitUpdateList(listId) {
      try {
        const index = this.project.lists.findIndex((l) => l.id === listId);
        if (index !== -1) {
          const updatedList = await updateList(listId, {
            name: this.project.lists[index].name,
          });
          if (updatedList) {
            this.project.lists[index] = updatedList;
          } else {
            console.error('Error updating list');
          }
        } else {
          console.error('List not found');
        }
      } catch (error) {
        console.error('Error updating list:', error);
      }
    },

    async submitAddCard(listId) {
      try {
        const listIndex = this.project.lists.findIndex(
          (list) => list.id === listId
        );
        if (listIndex !== -1) {
          const newCard = {
            name: this.newCardTitle,
            content: this.newCardDescription,
            position: 1,
            list_id: this.listId,
          };
          const createdCard = await createCard(newCard);
          if (createdCard) {
            this.project.lists[listIndex].cards.push(createdCard);
            this.newCardTitle = '';
            this.newCardDescription = '';
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

    async deleteCard(cardId) {
      try {
        const deletedCard = await deleteCard(cardId);
        if (deletedCard) {
          const index = this.project.cards.findIndex((l) => l.id === cardId);
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
  data() {
    return {
      listToDelete: null,
    };
  },
};
</script>
