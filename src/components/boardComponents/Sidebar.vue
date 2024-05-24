<!-- src/components/Sidebar.vue -->
<template>
  <b-offcanvas id="sidebar" class="col-sm-12" title="Projects" :backdrop="false">
    <template #title>
      Projects

      <!-- Create a new project -->
      <b-button v-b-modal.new-project class="add-new-project">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </b-button>
      <b-modal id="new-project" title="Create new project" centered>
      </b-modal>

    </template>
    <ul class="projects-list">
      <li v-for="project in store.projects" :key="project.id" class="project-item">
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
import { getProjects, getProject } from '@/api/project.js';
import useBoardStore from '../../store/board.store';

export default {
  setup() {
    const store = useBoardStore();
    return { store };
  },
  name: 'Sidebar',
  async created() {
    this.store.projects = await getProjects();
  },
  methods: {
    selectProject(projectId) {
      getProject(projectId).then((project) => {
        this.store.selectedProject = project;
      });
    },
  },
};
</script>
