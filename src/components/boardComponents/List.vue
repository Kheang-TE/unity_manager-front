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
            <b-modal :id="'edit-list-' + list.id.toString()" title="Edit list" centered @ok="submitUpdateList(list)">
              <b-form @submit.prevent="submitUpdateList(list)">
                <label> List Name:
                  <input class="form-control" type="text" v-model="this.editList.name" required />
                </label>
                <label> List Color:
                  <input class="form-control" type="color" v-model="this.editList.code_color" />
                </label>
              </b-form>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-list-' + list.id.toString()">Delete</b-link>
            <b-modal :id="'delete-list-' + list.id.toString()" centered @ok="deleteListFromDatabase(list.id)">
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
      <draggable v-model="list.cards" class="card-container" group="cards" item-key="id" v-bind="dragOptions"
        @change="updatePositionCard(list.id, $event)">
        <template #item="{ element: card }">
          <Card :card="card" :list_id="list.id" />
        </template>
      </draggable>

      <b-button class="add-card" v-b-modal="'add-card-list-' + list.id">[+] Add new card</b-button>
      <b-modal :id="'add-card-list-' + list.id" centered @ok="submitAddCard(list.id)">
        <template #title> Add Card to List: {{ list.name }} </template>
        <b-form @submit.prevent="submitAddCard(list.id)">
          <label>Card Title
            <input class="form-control" v-model="newCard.name" />
          </label>
          <label>Card Description
            <textarea class="form-control" v-model="newCard.content"></textarea>
          </label>
          <div>
            <b-form-group label="Select Tag">
              <ul class="tag-list">
                <li v-for="tag in boardStore.tags" :key="tag.id" class="tag-item">
                  <label :style="{ backgroundColor: tag.code_color }" class="btn tag-item-button">
                    <input type="checkbox" name="tag" :value="tag" @click="selectedTag(list.id)" />
                    {{ tag.name }}
                  </label>
                </li>
              </ul>
            </b-form-group>
          </div>
        </b-form>
      </b-modal>
    </b-collapse>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import useBoardStore from '@/store/board.store';
import Card from '@/components/boardComponents/Card.vue';
import { deleteList, updateList } from '@/api/list.js';
import { createCard, updateCard } from '@/api/card.js';

export default {
  name: 'List',
  setup() {
    const boardStore = useBoardStore();
    const newCard = {
      code_color: '',
      selectedTags: [],
    };
    const editList = {};
    return {
      boardStore,
      newCard,
      editList,
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
    async selectColor(color) {
      this.newCard.code_color = color;
      console.log(this.newCard.code_color);
    },

    async submitAddCard(id) {
      try {
        const cardData = {
          name: this.newCard.name,
          position: this.list.cards.length + 1,
          content: this.newCard.content,
          code_color: this.newCard.code_color,
          list_id: id,
          tags: this.newCard.selectTags,
        };
        await createCard(cardData);
        this.newCard.name = '';
        this.newCard.content = '';
        this.newCard.code_color = '';
      } catch (error) {
        console.error('Error creating the card:', error);
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

    updatePositionCard(listId, event) {
      console.log('list id : ', listId);
      console.log('card : ', event);

      if (Object.hasOwn(event, 'moved')) {
        const movedCard = this.list.cards[event.moved.newIndex];
        const beforeMovedCard = this.list.cards[event.moved.newIndex - 1];
        const afterMovedCard = this.list.cards[event.moved.newIndex + 1];
        if (!beforeMovedCard) {
          movedCard.position = afterMovedCard ? afterMovedCard.position / 2 : 1;
        } else if (!afterMovedCard) {
          movedCard.position = beforeMovedCard.position + 1;
        } else {
          movedCard.position = (beforeMovedCard.position + afterMovedCard.position) / 2;
        }
        movedCard.list_id = listId;
        this.savePositionCard(movedCard);
      }
      if (Object.hasOwn(event, 'added')) {
        const addedCard = this.list.cards[event.added.newIndex];
        const beforeAddedCard = this.list.cards[event.added.newIndex - 1];
        const afterAddedCard = this.list.cards[event.added.newIndex + 1];
        if (!beforeAddedCard) {
          addedCard.position = afterAddedCard ? afterAddedCard.position / 2 : 1;
        } else if (!afterAddedCard) {
          addedCard.position = beforeAddedCard.position + 1;
        } else {
          addedCard.position = (beforeAddedCard.position + afterAddedCard.position) / 2;
        }
        addedCard.list_id = listId;
        this.savePositionCard(addedCard);
      }
    },

    async savePositionCard(movedCard) {
      try {
        const tags = movedCard.tags.map((tag) => tag.id);
        const card = {
          id: movedCard.id,
          name: movedCard.name,
          position: movedCard.position,
          content: movedCard.content,
          list_id: movedCard.list_id,
          tags,
        };
        await updateCard(card);
      } catch (error) {
        console.error('Error updating the card :', error);
      }
    },

    selectedTag(listId) {
      const modal = document.getElementById(`add-card-list-${listId}`);
      this.newCard.selectTags = [];
      modal.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        this.newCard.selectTags.push(checkbox._value.id);
      });
    },

  },
};
</script>
