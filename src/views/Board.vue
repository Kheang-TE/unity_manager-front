<template>
  <div class="board">
    <Sidebar/>
    <BoardHeader/>
    <div class="background-wall"></div>
    <div id="board-header">
      <h1>{{ boardStore.selectedProject?.name }}</h1>
    </div>
    <div id="board-content">
      <draggable  v-if="boardStore.selectedProject"  v-model="boardStore.selectedProject.lists" class="list-container" v-bind="dragOptions">
        <template #item="{ element: list }">
          <List :list="list"/>
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
import { createList, getListByProject } from '@/api/list.js';
import { initializeBoardEvents } from '@/sockets/socket';

export default {
  setup() {
    const boardStore = useBoardStore();
    const newList = {};
    return {
      newList,
      boardStore,
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
    computed: {

      dragOptions() {
        return {
          animation: 200,
          group: 'lists',
          disabled: false,
        };
      },
    },
  },
};
</script>
