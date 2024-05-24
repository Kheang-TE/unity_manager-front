import { defineStore } from 'pinia';

const useBoardStore = defineStore('board', {
  state: () => ({
    selectedProject: {
      id: null,
      name: '',
      lists: [],
    },
    projects: [],
  }),
  actions: {
    setSelectedProject(project) {
      this.selectedProject = project;
    },
    fetchProjects() {
      // Logic to fetch projects
    },
  },
});

export default useBoardStore;
