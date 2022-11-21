<template>
  <div class="user_row">

    <div class="row">
      <div :style="styleForSubordinates">
        <span v-if="rowData.subordinates.length > 0" @click="toggleSub">+</span>
        {{ rowData.name }}
      </div>

      <div>{{ rowData.phone }}</div>
    </div>

    <table-row
    v-if="shownSub"
    class="subordinates"
    v-for="user in rowData.subordinates"
    :key="user.id" :rowData="user"
    :isSubordinate="true"
    :flexBasis="innerFlexBasis"
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
    },
    flexBasis: {
      type: Number,
      default: 220
    }
  },
  data () {
    return {
      shownSub: false,
      innerFlexBasis: 0
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
  },
  computed: {
    styleForSubordinates () {
      this.innerFlexBasis = this.flexBasis - 20
      if (this.isSubordinate) {
        return {
          flex: `1 ${this.innerFlexBasis}px`,
          'margin-left': `${200 - this.innerFlexBasis}px`,
          width: 'auto'
        }
      }
    }
  }
}
</script>

<style scoped>
.user_row {
  width: auto;
  padding: 0;
  margin: 0;
}
.row {
  width: 100%;
  display: flex;
  justify-content: baseline;
}
.row div {
  text-align: left;
  padding: 12px;
  border: 1px solid black;
}
.row div:nth-child(1) {
  flex: 1 2 200px;
}
.row div:nth-child(2) {
  flex: 2 1;
  flex-wrap: nowrap;
}
span {
  font-weight: bold;
  margin-left: -5px;
}
/* .subordinates div div:nth-child(1) {
  margin-left: 20px;
  width: auto;
} */
</style>
