<template>
  <div class="board">
    <Chat />
    <Sidebar @projectSelected="handleProjectSelected"/>
    <div class="background-wall"></div>
    <BoardHeader/>
    <div id="board-content">
      <ContentProject :project="selectedProject" />
    </div>
  </div>
</template>

<script>
import BoardHeader from '@/components/BoardHeader.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
import ContentProject from '@/components/boardComponents/ContentProject.vue';
import Chat from '@/components/boardComponents/Chat.vue';

export default {
  name: 'Board',
  components: {
    Chat,
    Sidebar,
    BoardHeader,
    ContentProject,
  },
  data() {
    return {
      selectedProject: {},
    };
  },
  methods: {
    handleProjectSelected(project) {
      console.log('from Board', project);
      this.selectedProject = { ...project };
    },
  },
};
</script>
