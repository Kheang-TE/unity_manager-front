<template>
  <header id="board-header" class="navbar">
    <div class="container-fluid">
      <button class="board-header-btn" @click="toggleSidebar"><font-awesome-icon :icon="['fas', 'bars']" />
        <img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo">
      </button>
      <Sidebar :isOpen="isSidebarOpen" @update:isOpen="isSidebarOpen = $event" />
      
      <div class="d-flex">
        <DropdownUser />
        <button class="btn" @click="toggleSidebar"><font-awesome-icon :icon="['fas', 'comments']" /></button>
      </div>
    </div>
  </header>
</template>

<script>
  import { ref } from 'vue'
  import Sidebar from '@/components/boardComponents/Sidebar.vue'
  import DropdownUser from '@/components/boardComponents/DropdownUser.vue'
  export default {
    name: 'BoardHeader',
    components:{
      Sidebar,
      DropdownUser,
    },
    setup() {
      const isSidebarOpen = ref(false); 

      const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value;
      };

      return {
        isSidebarOpen,
        toggleSidebar
      };
    }
  }
</script>