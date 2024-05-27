<template>
  <div class="board">
    <Sidebar/>
    <div class="background-wall"></div>
    <div id="board-content">
      <ContentProject/>
    </div>
    <BoardHeader/>
  </div>
</template>

<script setup>
import ContentProject from '@/components/boardComponents/ContentProject.vue';
import BoardHeader from '@/components/BoardHeader.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
</script>
