<template>
  <div class="board">
    <Sidebar/>
    <div class="background-wall"></div>
    <BoardHeader/>
    <div id="board-content">
      <Chat/>
      <ContentProject/>
    </div>
  </div>
</template>

<script setup>
import BoardHeader from '@/components/BoardHeader.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
import Chat from '@/components/boardComponents/Chat.vue';
import ContentProject from '@/components/boardComponents/ContentProject.vue';

</script>
