<!-- src/components/Sidebar.vue -->
<template>
  <b-offcanvas id="sidebar" title="Projects" :backdrop="false">
    <ul>
      <li v-for="project in projects" :key="project.id">
        <a href="#" @click.prevent=fetchProject(project.id)>{{ project.name }}</a>
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
    fetchProject(id) {
      getProject(id).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>
