<template>
  <div class="board">
    <div class="background-wall"></div>
    <BoardHeader/>
    <div id="board-content">
      <ContentProject />
    </div>
  </div>
</template>

<script>
  import BoardHeader from "@/components/BoardHeader.vue"
  import ContentProject from "@/components/boardComponents/ContentProject.vue"
  export default {
    name: "Board",
    components: {
    },
  methods: {
    add: function() {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    add2: function() {
      this.list2.push({ name: "Juan " + id, id: id++ });
    },
    replace2: function() {
      this.list2 = [{ name: "Edgard", id: id++ }];
    }
  }
};
</script>
<style scoped></style>