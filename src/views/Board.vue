<template>
  <div class="board">
    <Sidebar/>
    <BoardHeader/>
    <div class="background-wall"></div>
    <div id="board-content">
      <draggable v-if="boardStore.selectedProject" v-model="boardStore.selectedProject.lists" class="list-container" v-bind="dragOptions">
        <template #item="{ element: list }">
          <List :list="list" />
        </template>
      </draggable>
      <b-button class="new-list" v-b-modal.add-new-list>
        <font-awesome-icon :icon="['fas', 'plus']" />[ Add new list ]
      </b-button>
      <b-modal id="add-new-list" title="Add new list" centered @ok="addList">
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

export default {
  setup() {
    const boardStore = useBoardStore();
    return {
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
  methods: {
    handleProjectSelected() {
      this.selectedProject = { ...useBoardStore().selectedProject };
    },
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
};
</script>
