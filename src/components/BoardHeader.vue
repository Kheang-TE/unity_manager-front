<template>

   <b-navbar fixed="top">
    <b-navbar-brand>
      <b-button v-b-toggle.sidebar><font-awesome-icon :icon="['fas', 'bars']" /></b-button>
      <img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo">
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <DropdownUser />
      <b-button v-b-toggle.chat><font-awesome-icon :icon="['fas', 'comments']" /></b-button>
    </b-navbar-nav>
  </b-navbar>
  <Sidebar />
  <Chat />

</template>

<script>
import useBoardStore from '@/store/board.store.js';
import DropdownUser from '@/components/boardComponents/DropdownUser.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
import Chat from '@/components/Chat.vue';

export default {
  setup() {
    const store = useBoardStore();
    return { store };
  },
  name: 'BoardHeader',
  components: {
    Chat,
    DropdownUser,
    Sidebar,
  },
};
</script>
