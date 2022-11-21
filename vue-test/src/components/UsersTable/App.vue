<template>
<div class="user_table">
  <table-header
  :headerData="headers"
  @sort="sortUsers"
  />

  <table-row
  v-for="user in users"
  :key="user.id"
  :rowData="user"
  />
</div>
</template>

<script>
import TableRow from './TableRow.vue'
import TableHeader from './TableHeader.vue'

export default {
  name: 'users-table',
  components: {
    TableRow,
    TableHeader
  },
  props: {
    users: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      required: true
    }
  },
  methods: {
    sortUsers (selectedSort) {
      this.$emit('sort', selectedSort)
    }
  }
}
</script>

<style scoped>
  .user_table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
