<template>
  <header id="board-header" class="navbar">
    <div class="container-fluid">
      <b-button class="btn btn-primary" @click="toggleSidebar"><font-awesome-icon :icon="['fas', 'bars']" /></b-button>
      <Sidebar :isOpen="isSidebarOpen" @update:isOpen="isSidebarOpen = $event" />
      
      <div class="d-flex">
        <DropdownUser />
        <button class="btn btn-primary" @click="toggleSidebar"><font-awesome-icon :icon="['fas', 'comments']" /></button>
        <!-- <Chat :isOpen="isSidebarOpen" @update:isOpen="isSidebarOpen = $event" /> -->
      </div>
    </div>
  </header>
</template>

<script>
  import { ref } from 'vue'
  import Sidebar from '@/components/boardComponents/Sidebar.vue'
  // import Chat from '@/components/boardComponents/Chat.vue'
  import DropdownUser from '@/components/boardComponents/DropdownUser.vue'
  export default {
    name: 'BoardHeader',
    components:{
      Sidebar,
      // Chat,
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