<template>
  <div class="board">
    <Sidebar @projectSelected="handleProjectSelected"/>
    <div class="background-wall"></div>
    <BoardHeader/>
    <div id="board-content">
      <ContentProject :project="selectedProject" />
      <Chat :project="selectedProject" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BoardHeader from '@/components/BoardHeader.vue';
import Chat from '@/components/boardComponents/Chat.vue';
import ContentProject from '@/components/boardComponents/ContentProject.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
import useBoardStore from '../store/board.store';

// Utilisation du store Pinia
const store = useBoardStore();

// Déclaration des données réactives
const selectedProject = ref(null);

// Déclaration des méthodes
const handleProjectSelected = (project) => {
  selectedProject.value = project;
  console.log('Project selected in Board:', selectedProject.value);
};
</script>
