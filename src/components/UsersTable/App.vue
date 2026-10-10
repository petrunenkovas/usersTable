<template>
<div class="user_table">
  <table-header
  :headerData="headers"
  :sortAscending = sortAscending
  @sort="sortUsers"
  />

  <table-row
  v-for="user in users"
  :key="user.id"
  :userToView="user"
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
    },
    sortAscending: {
      type: Number,
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
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border: 1px solid #dde3ef;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(31, 51, 89, 0.06);
    overflow: hidden;
  }
</style>
