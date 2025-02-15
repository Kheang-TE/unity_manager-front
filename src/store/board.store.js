import { defineStore } from 'pinia';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  removeProject,
  createCollaborator,
  getLastCollaborator,
} from '@/api/project.js';
import useUserStore from '@/store/user.store';

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
        if (!this.projects) {
          this.projects = [];
        }
        if (!this.projects) {
          this.projects = [];
        }
        this.projects.push(result);
        this.projects.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      });
    },
    editProject(project) {
      updateProject(project).then((result) => {
        this.selectedProject = { ...this.selectedProject, ...result };
      });
    },
    async deleteProject(projectId) {
      this.projects = this.projects.filter(
        (project) => project.id !== projectId,
      );
      if (this.selectedProject.id === projectId) {
        this.selectedProject = {};
      }
      this.projects = this.projects.filter(
        (project) => project.id !== projectId,
      );
      await removeProject(projectId);
    },

    async addCollaborator(collaborator) { // Add collaborator to the project
      await createCollaborator(collaborator);
    },
    fetchLastCollaborator() {
      getLastCollaborator(this.selectedProject.id).then((collaborator) => {
        this.selectedProject.collaborators.push(collaborator);
      });
    },
    refreshMessageColor() {
      this.selectedProject.messages.forEach((message) => {
        if (message.user_id === useUserStore().user.id) {
          message.user.color = useUserStore().user.code_color;
        }
      });
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

    // Getter pour sélectionner les tags d'un projet seletionné
    tags: (state) => state.selectedProject.tags || [],

    // Getter pour séléctionner les collaborateurs d'un projet seletionné
    collaborators: (state) => state.selectedProject.collaborators || [],
  },
});

export default useBoardStore;
