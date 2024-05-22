<template>
  <div class="board">
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
import ContentProject from '@/components/boardComponents/ContentProject.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';

export default {
  name: 'Board',
  components: {
    Sidebar,
    BoardHeader,
    ContentProject,
  },
  data() {
    return {
      selectedProject: null,
    };
  },
  methods: {
    handleProjectSelected(project) {
      console.log('from Board', project);
      this.selectedProject = project;
    },
  },
};
</script>
