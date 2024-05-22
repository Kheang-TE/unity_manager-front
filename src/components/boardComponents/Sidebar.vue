<!-- src/components/Sidebar.vue -->
<template>
  <b-offcanvas id="sidebar" title="Projects" :backdrop="false">
    <ul>
      <li v-for="project in projects" :key="project.id">
        <a href="#" @click.prevent=selectProject(project.id)>{{ project.name }}</a>
      </li>
    </ul>
  </b-offcanvas>
</template>

<script>
import { getProjects, getProject } from '@/api/project.js';

export default {
  name: 'Sidebar',
  data() {
    return {
      projects: [],
    };
  },
  async created() {
    this.projects = await getProjects();
  },
  methods: {
    selectProject(projectId) {
      getProject(projectId).then((project) => {
        this.$emit('projectSelected', project);
      });
    },
  },
};
</script>
