<template>
  <header>
    <div class="wrapper">
      <HomeNavigation />
    </div>
  </header>
</template>

<script>
  import HomeNavigation from './HomeNavigation.vue'
  export default {
    name: 'MainHeader',
    components: {
      HomeNavigation
    }
  }
</script>