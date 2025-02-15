<!-- src/components/Sidebar.vue -->
<template>
  <b-button v-b-toggle.sidebar>
    <font-awesome-icon :icon="['fas', 'bars']" />
  </b-button>
  <b-offcanvas id="sidebar" ref="sidebar" class="col-sm-12" title="Projects" :backdrop="false" :model-value="true">
    <template #title>
      Projects

      <!-- Create a new project -->
      <b-button v-b-modal.new-project class="add-new-project">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </b-button>
      <b-modal id="new-project" title="Create new project" centered @ok="submitNewProject(this.newProject)">
        <template #title>Add new project</template>
        <b-form-group label="Project Name">
          <b-form-input v-model="this.newProject.name"></b-form-input>
        </b-form-group>
      </b-modal>
    </template>
    <ul class="projects-list">
      <li v-for="project in projects" :key="project.id" class="project-item">
        <a href="#" class="project-link" @click.prevent="[linkActive(), selectProject(project.id), closeSidebar()]">{{
          project.name
          }}</a>
        <div class="project-control">
          <!-- Edit the project -->
          <b-button v-b-modal="'edit-project-' + project.id" class="project-control-edit">
            <font-awesome-icon :icon="['far', 'pen-to-square']" />
          </b-button>
          <b-modal :id="'edit-project-' + project.id" centered @ok="updateProject(project)">
            <template #title>
              Edit the project
            </template>
            <b-form-input v-model="project.name" type="text"></b-form-input>
          </b-modal>

          <!-- Delete the project -->
          <b-button v-b-modal="'delete-project-' + project.id" class="project-control-delete">
            <font-awesome-icon :icon="['far', 'trash-can']" />
          </b-button>
          <b-modal :id="'delete-project-' + project.id" centered @ok="removeProject(project.id)">
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

<script>
import { computed } from 'vue';
import useBoardStore from '../../store/board.store';
import useUserStore from '../../store/user.store';
import { initializeBoardEvents } from '@/sockets/socket.js';

export default {
  name: 'Sidebar',
  setup() {
    const boardStore = useBoardStore();
    const userStore = useUserStore();
    const projects = computed(() => boardStore.allProjects);
    const user = computed(() => userStore.user);
    const newProject = {
      owner_id: user.value.id,
    };
    const editProject = {};

    return {
      boardStore,
      userStore,
      projects,
      newProject,
      editProject,
    };
  },

  created() {
    initializeBoardEvents(this.refreshBoard);
    this.boardStore.fetchProjects();
  },
  methods: {
    async refreshBoard() {
      this.boardStore.fetchProjects();
    },
    submitNewProject(newProject) {
      this.boardStore.addProject(newProject);
      this.newProject.name = '';
    },
    selectProject(projectId) {
      this.boardStore.setSelectedProject(projectId);
      this.linkActive();
    },
    updateProject(editedProject) {
      this.boardStore.editProject(editedProject);
    },
    removeProject(projectId) {
      this.boardStore.deleteProject(projectId);
    },
    closeSidebar() {
      if (this.$refs.sidebar) {
        this.$refs.sidebar.hide();
      }
    },
    linkActive() {
      const sidebar = document.getElementById('sidebar');
      const links = sidebar.querySelectorAll('.project-link');
      links.forEach((link) => {
        link.classList.remove('active');
        link.addEventListener('click', () => {
          link.classList.add('active');
        });
      });
    },
  },
};
</script>
