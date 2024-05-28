<template>
  <div class="board">
    <Sidebar />
    <BoardHeader />
    <div class="background-wall"></div>
    <div id="board-header">
      <h1>{{ boardStore.selectedProject?.name }}</h1>
    </div>
    <div id="board-content">
      <draggable v-if="boardStore.selectedProject" v-model="boardStore.selectedProject.lists" class="list-container"
        item-key="id" v-bind="dragOptions" @end="updatePosition">
        <template #item="{ element: list }">
          <List :list="list" />
        </template>
      </draggable>
      <b-button class="new-list" v-b-modal.add-new-list>
        <font-awesome-icon :icon="['fas', 'plus']" />[ Add new list ]
      </b-button>
      <b-modal id="add-new-list" title="Add new list" centered @ok="addList">
        <b-form @submit.prevent="addList">
          <b-form-group label="List Name">
            <b-form-input v-model="this.newList.name"></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import List from '@/components/boardComponents/List.vue';
import useBoardStore from '@/store/board.store';
import BoardHeader from '@/components/BoardHeader.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
import { createList, getListByProject, updateList } from '@/api/list.js';
import { initializeBoardEvents } from '@/sockets/socket';

export default {
  setup() {
    const boardStore = useBoardStore();
    const newList = {};
    const editList = {};
    return {
      boardStore,
      newList,
      editList,
    };
  },
  name: 'Board',
  components: {
    draggable,
    Sidebar,
    BoardHeader,
    List,
  },
  created() {
    initializeBoardEvents(this.refreshBoard);
  },
  methods: {
    async refreshBoard() {
      useBoardStore().selectedProject.lists = await getListByProject(useBoardStore().selectedProject.id);
    },
    async addList() {
      try {
        const list = {
          name: this.newList.name,
          position: 1,
          code_color: '',
          project_id: useBoardStore().selectedProject.id,
        };
        await createList(list);
      } catch (error) {
        console.error('Error creating the list :', error);
      }
    },

    /**
     * Updates the position of a list in the board store based on the given event.
     *
     * @param {Object} event - The event containing information about the moved list.
     * @param {number} event.newIndex - The new index of the moved element.
     * @return {void} This function does not return anything.
     */
    updatePosition(event) {
      const movedElement = this.boardStore.selectedProject.lists[event.newIndex];
      const beforeElement = this.boardStore.selectedProject.lists[event.newIndex - 1];
      const afterElement = this.boardStore.selectedProject.lists[event.newIndex + 1];

      if (!beforeElement) {
        movedElement.position = afterElement.position / 2;
      } else if (!afterElement) {
        movedElement.position = beforeElement.position + 1;
      } else {
        movedElement.position = (beforeElement.position + afterElement.position) / 2;
      }

      this.savePositions(movedElement);
    },

    /**
     * Asynchronously saves the position of a moved element in the list.
     *
     * @param {Object} movedElement - The list that has been moved.
     * @param {string} movedElement.id - The ID of the moved list.
     * @param {string} movedElement.name - The name of the moved list.
     * @param {string} movedElement.code_color - The code color of the moved list.
     * @param {number} movedElement.position - The new position of the moved list.
     * @param {string} movedElement.project_id - The ID of the project the moved list belongs to.
     * @return {Promise} A promise that resolves when the list has been successfully updated, or rejects with an error.
     */
    async savePositions(movedElement) {
      try {
        await updateList({
          id: movedElement.id,
          name: this.editList.name,
          code_color: this.editList.code_color,
          position: movedElement.position,
          project_id: movedElement.project_id,
        });
      } catch (error) {
        console.error('Error updating the list :', error);
      }
    },
  },
  computed: {
    /**
     * Returns an object containing options for dragging.
     *
     * @return {Object} An object with the following properties:
     *   - animation: The duration of the drag animation in milliseconds.
     *   - group: The group to which the draggable element belongs.
     *   - disabled: A boolean indicating whether dragging is disabled.
     */
    dragOptions() {
      return {
        animation: 200,
        group: 'lists',
        disabled: false,
      };
    },
  },
};
</script>
