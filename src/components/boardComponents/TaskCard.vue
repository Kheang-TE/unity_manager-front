<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="flex justify-between">
      <div class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ card.name }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaskCard',
    props: {
      card: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>