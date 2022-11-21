<template>
  <div class="header">
      <div
      v-for="item in headerData"
      :key="item.name"
      :class="item.name"
      @click="sortUsers"
      >
        {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-header',
  props: {
    headerData: {
      type: Array,
      required: true
    }
  },
  methods: {
    sortUsers (event) {
      this.$emit('sort', event.target.className)
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: baseline;
}
.header div {
  text-align: left;
  padding: 12px;
  border: 1px solid black;
  flex: 2;
}
.header div:nth-child(1) {
  flex: 1 200px;
}
</style>
