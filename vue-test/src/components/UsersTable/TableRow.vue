<template>
  <div class="user_row">

    <div class="row">
      <div >
        <span
          v-if="rowData.subordinates.length > 0"
          @click="toggleSub"
          >
          {{ shownSub ? '-' : '+' }}
        </span>
        {{ rowData.name }}
      </div>

      <div>{{ rowData.phone }}</div>
    </div>

    <table-row
    v-if="shownSub"
    class="subordinates"
    v-for="user in rowData.subordinates"
    :key="user.id"
    :rowData="user"
    :isSubordinate="true"
    />
  </div>
</template>

<script>
export default {
  name: 'table-row',
  props: {
    rowData: {
      type: Object,
      required: true
    },
    isSubordinate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      shownSub: false
    }
  },
  methods: {
    toggleSub () {
      if (this.shownSub) {
        this.shownSub = false
      } else {
        this.shownSub = true
      }
    }
  }
}
</script>

<style scoped>
.user_row {
  padding: 0;
  margin: 0;
}
.row {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.user_row.subordinates {
  padding-left: 20px;
}
.row div {
  text-align: left;
  padding: 12px;
  border: 1px solid black;
}
.row div:nth-child(1) {
  flex: 1 2;
}
.row div:nth-child(2) {
  flex: 0 100px;
}
span {
  font-weight: bold;
  margin-left: -5px;
}
</style>
