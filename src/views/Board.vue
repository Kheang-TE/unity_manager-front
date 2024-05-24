<template>
  <div class="board">
    <Chat />
    <Sidebar @projectSelected="handleProjectSelected" />
    <div class="background-wall"></div>
    <BoardHeader />
    <div id="board-content">
      <draggable v-if="selectedProject" v-model="selectedProject.lists" class="list-container" @start="drag = true"
        @end="drag = false">
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
import BoardHeader from '@/components/BoardHeader.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
import List from '@/components/boardComponents/List.vue';
import Chat from '@/components/boardComponents/Chat.vue';

export default {
  name: 'Board',
  components: {
    draggable,
    Chat,
    Sidebar,
    BoardHeader,
    List,
  },
  data() {
    return {
      selectedProject: null,
    };
  },
  methods: {
    handleProjectSelected(project) {
      console.log('from Board', project);
      this.selectedProject = { ...project };
    },
  },
};
</script>
