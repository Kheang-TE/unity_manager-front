<!-- src/components/Sidebar.vue -->
<template>
  <b-offcanvas id="sidebar" class="col-sm-12" title="Projects" :backdrop="false">
    <template #title>
      Projects

      <!-- Create a new project -->
      <b-button v-b-modal.new-project class="add-new-project">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </b-button>
      <b-modal id="new-project" title="Create new project" centered @ok="submitNewProject(this.newProject)">
        <template #title >Add new project</template>
        <b-form-group label="Project Name">
        <b-form-input  v-model="this.newProject.name"></b-form-input>
        </b-form-group>
      </b-modal>

    </template>
    <ul class="projects-list">
      <li v-for="project in boardStore.projects" :key="project.id" class="project-item">
        <a href="#" class="project-link" @click.prevent=selectProject(project.id)>{{ project.name }}</a>
        <div class="project-control">

          <!-- Edit the project -->
          <b-button v-b-modal="'edit-project-' + project.id" class="project-control-edit">
            <font-awesome-icon :icon="['far', 'pen-to-square']" />
          </b-button>
          <b-modal :id="'edit-project-' + project.id" centered>
            <template #title>
              Edit the project : {{ project.name }}
            </template>
          </b-modal>

          <!-- Delete the project -->
          <b-button v-b-modal="'delete-project-' + project.id" class="project-control-delete">
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </b-button>
          <b-modal :id="'delete-project-' + project.id" centered>
            <template #title>
              Delete the project : {{ project.name }}
            </template>
            <p>Are you sure you want to delete this project ?</p>
          </b-modal>

        </div>
      </li>
    </ul>
  </b-offcanvas>
</template>

<script >
import useBoardStore from '../../store/board.store';
import { useUserStore } from '../../store/user.store';
import { initializeBoardEvents } from '@/sockets/socket.js';

export default {
  setup() {
    const boardStore = useBoardStore();
    const newProject = {
      owner_id: useUserStore().user.id,
    };
    return { boardStore, newProject };
  },
  name: 'Sidebar',
  created() {
    initializeBoardEvents(this.refreshBoard);
    this.boardStore.fetchProjects();
  },
  methods: {
    async refreshBoard() {
      useBoardStore().fetchProjects();
    },
    submitNewProject(newProject) {
      this.boardStore.addProject(newProject);
    },
    selectProject(projectId) {
      this.boardStore.setSelectedProject(projectId);
    },
  },
};
</script>
