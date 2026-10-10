<template>
  <div class="header">
      <button
      v-for="item in headerData"
      :key="item.name"
      :class="item.name"
      type="button"
      @click="sortUsers(item.name)"
      >
        {{ item.title }}
        <span
          v-if="sortAscending !== 0 && selectedSort === item.name"
          >
          {{ sortAscending === 1 ? '▲' : '▼' }}
        </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'table-header',
  props: {
    headerData: {
      type: Array,
      required: true
    },
    sortAscending: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      selectedSort: null
    }
  },
  methods: {
    sortUsers (field) {
      this.selectedSort = field
      this.$emit('sort', field)
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  background: #edf2fb;
}
.header button {
  text-align: left;
  padding: 14px 16px;
  border: 0;
  background: transparent;
  color: #243047;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
}
.header button:nth-child(2) {
  flex: 0 0 180px;
}
.header button:hover { background: #e1eafb; }
.header button:focus-visible { outline: 3px solid #94b7ff; outline-offset: -3px; }
span {
  font-size: x-small;
}
@media (max-width: 480px) {
  .header button:nth-child(2) { flex-basis: 145px; }
}
</style>
