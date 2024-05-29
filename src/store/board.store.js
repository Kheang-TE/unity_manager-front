import { defineStore } from 'pinia';
import { getProjects, getProject, createProject } from '@/api/project.js';

const useBoardStore = defineStore('board', {
  state: () => ({
    selectedProject: null,
    projects: [],
  }),
  actions: {
    setSelectedProject(projectId) {
      getProject(projectId).then((project) => {
        this.selectedProject = project;
      });
    },
    fetchProjects() {
      getProjects().then((projects) => {
        this.projects = projects;
      });
    },
    addProject(project) {
      createProject(project).then((result) => {
        this.projects.push(result);
      });
    },
  },
});

export default useBoardStore;
