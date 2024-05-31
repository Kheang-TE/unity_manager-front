import { defineStore } from 'pinia';
import {
  getProjects, getProject, createProject, updateProject, removeProject,
} from '@/api/project.js';

const useBoardStore = defineStore('board', {
  state: () => ({
    selectedProject: {},
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
        this.projects.sort((a, b) => ((a.name > b.name) ? 1 : -1));
      });
    },
    editProject(project) {
      updateProject(project).then((result) => {
        this.selectedProject = result;
      });
    },
    async deleteProject(projectId) {
      if (this.selectedProject.id === projectId) {
        this.selectedProject = {};
      }
      await removeProject(projectId);
    },
  },
  getters: {

    // Getter pour sélectionner récupérer le projet seletionné
    project: (state) => state.selectedProject || {},

    // Getter pour sélectionner tous les projets
    allProjects: (state) => state.projects,

    // Getter pour sélectionner les messages d'un projet seletionné
    messages: (state) => state.selectedProject.messages || [],

    // Getter pour sélectionner les utilisateurs d'un projet seletionné
    users: (state) => state.selectedProject.users || [],

    // Getter pour sélectionner les listes d'un projet seletionné
    lists: (state) => state.selectedProject.lists || [],

    // Getter pour sélectionner les cartes d'un projet seletionné
    cards: (state) => state.selectedProject.cards || [],

    // Getter pour séléctionner les collaborateurs d'un projet seletionné
    collaborators: (state) => state.selectedProject.collaborators || [],
  },
});

export default useBoardStore;
