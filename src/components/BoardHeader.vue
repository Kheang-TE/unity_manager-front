<template>

  <b-navbar fixed="top">
    <b-navbar-brand>
      <Sidebar />
      <img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo">
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <Tag />
      <DropdownUser />
      <Chat />
    </b-navbar-nav>
  </b-navbar>

</template>

<script>
import DropdownUser from '@/components/boardComponents/DropdownUser.vue';
import Sidebar from '@/components/boardComponents/Sidebar.vue';
import Chat from '@/components/Chat.vue';
import Tag from '@/components/boardComponents/Tag.vue';

export default {
  name: 'BoardHeader',
  components: {
    Chat,
    Tag,
    DropdownUser,
    Sidebar,
  },
};
</script>
