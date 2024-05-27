<template>
  <div class="board">
    <Chat />
    <Sidebar @projectSelected="handleProjectSelected" />
    <div class="background-wall"></div>
    <BoardHeader />
    <div id="board-content">
      <draggable
        v-if="selectedProject"
        v-model="selectedProject.lists"
        class="list-container"
        v-bind="dragOptions"
      >
        <template #item="{ element: list }">
          <List :list="list" :projectId="selectedProject.id" />
        </template>
      </draggable>
      <b-button class="new-list" v-b-modal.add-new-list>
        <font-awesome-icon :icon="['fas', 'plus']" />[ Add new list ]
      </b-button>
      <b-modal id="add-new-list" title="Add new list" centered @ok="addList">
        <b-form @submit.prevent="addList">
          <b-form-group label="List Name">
            <b-form-input v-model="list.name"></b-form-input>
          </b-form-group>
        </b-form>
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
import { createList } from '@/api/list.js';

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
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'lists',
        disabled: false,
      };
    },
  },
  methods: {
    async addList() {
      try {
        const newId = this.list.length + 1;
        console.log(newId);
        const newList = {
          id: newId,
          name: `List ${newId}`,
          position: 1,
          code_color: '',
          project_id: this.projectId,
        };

        const createdList = await createList(newList);

        if (createdList) {
          this.list.push(createdList);
        } else {
          console.error('Error creating the list');
        }
      } catch (error) {
        console.error('Error creating the list :', error);
      }
    },
  },
};
</script>
