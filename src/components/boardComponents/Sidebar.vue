<!-- src/components/Sidebar.vue -->
<template>
  <div class="offcanvas offcanvas-start" :class="{ show: isOpen }" tabindex="-1" style="visibility: visible;">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Sidebar</h5>
      <button type="button" class="btn-close" @click="closeSidebar"></button>
    </div>
    <div class="offcanvas-body">
      <p>Contenu de la sidebar...</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closeSidebar() {
      this.$emit('update:isOpen', false);
    }
  }
}
</script>

<style scoped>
  .offcanvas {
    width: 250px;
    max-width: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }
  .offcanvas.show {
    transform: translateX(0);
  }
</style>