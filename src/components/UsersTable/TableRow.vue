<template>
  <div class="user_row" :class="{subordinates: isSubordinate}">

    <div class="row">
      <div >
        <button
          v-if="userToView.subordinates.length > 0"
          type="button"
          class="toggle"
          :aria-label="shownSub ? 'Скрыть подчинённых' : 'Показать подчинённых'"
          :aria-expanded="shownSub"
          @click="toggleSub"
          >
          {{ shownSub ? '-' : '+' }}
        </button>
        {{ userToView.name }}
      </div>

      <div>{{ userToView.phone }}</div>
    </div>

    <table-row
    v-if="shownSub"
    v-for="user in userToView.subordinates"
    :key="user.id"
    :userToView="user"
    :isSubordinate="true"
    />
  </div>
</template>

<script>
export default {
  name: 'table-row',
  props: {
    userToView: {
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
  border-top: 1px solid #edf0f5;
}
.user_row.subordinates {
  padding-left: 18px;
}
.row div {
  text-align: left;
  padding: 13px 16px;
  min-width: 0;
  overflow-wrap: anywhere;
}
.row div:nth-child(1) {
  flex: 1;
}
.row div:nth-child(2) {
  flex: 0 0 180px;
  white-space: nowrap;
}
.toggle {
  margin-right: 6px;
  border: 0;
  border-radius: 4px;
  background: #edf2fb;
  color: #315fbb;
  cursor: pointer;
  font: inherit;
  font-weight: bold;
  width: 22px;
  height: 22px;
}
.toggle:focus-visible { outline: 3px solid #94b7ff; }
@media (max-width: 480px) {
  .row div:nth-child(2) { flex-basis: 145px; }
}
</style>
