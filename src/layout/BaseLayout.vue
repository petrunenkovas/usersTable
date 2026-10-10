<template>
  <div class="main">
    <button @click="showDialog">Добавить</button>

    <add-user-dialog
    v-if="shownDialog"
    :inputData="headers"
    :users="users"
    @createUser="createUser"
    @close="closeDialog"
    />

    <users-table
    :users="groupedUsersToView"
    :headers="headers"
    :sortAscending = selectedSort.ascending
    @sort="sortUsers"
    />

    <div v-show="shownSavedUser" class="savedUser">Пользователь успешно создан</div>
</div>
</template>

<script>
import UsersTable from '../components/UsersTable/App.vue'
import AddUserDialog from '../components/AddUserDialog.vue'
import { loadUsers, sortUsers, groupUsers } from '../utils/users'

export default {
  name: 'base-layout',
  components: {
    UsersTable,
    AddUserDialog
  },
  data () {
    return {
      users: [],
      headers: [{ name: 'name', title: 'Имя' }, { name: 'phone', title: 'Телефон' }],
      shownDialog: false,
      shownSavedUser: false,
      selectedSort: { field: null, ascending: 0 }
    }
  },
  methods: {
    createUser (newUser) {
      this.users.push(newUser)
      localStorage.setItem('users', JSON.stringify(this.users))
      this.closeDialog()
      this.shownSavedUser = true
      setTimeout(() => {
        this.shownSavedUser = false
      }, 2000)
    },
    sortUsers (selectedSort) {
      if (this.selectedSort.field === selectedSort) {
        this.selectedSort.ascending = (this.selectedSort.ascending === -1) ? 1 : -1
      } else {
        this.selectedSort.ascending = 1
        this.selectedSort.field = selectedSort
      }
    },
    showDialog () {
      this.shownDialog = true
    },
    closeDialog () {
      this.shownDialog = false
    }
  },
  computed: {
    sortUsersByProp () {
      return sortUsers(this.users, this.selectedSort.field, this.selectedSort.ascending)
    },
    groupedUsersToView () {
      return groupUsers(this.sortUsersByProp)
    }
  },
  mounted () {
    this.users = loadUsers(localStorage.getItem('users'))
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: min(100%, 720px);
  margin: 48px auto;
  align-items: flex-end;
}
button {
  background: #315fbb;
  color: white;
  border: 0;
  border-radius: 8px;
  margin: 0 0 20px;
  padding: 10px 18px;
  cursor: pointer;
  font: inherit;
}
button:hover { background: #244d9d; }
button:focus-visible { outline: 3px solid #94b7ff; outline-offset: 2px; }
.savedUser {
  background: #e1f5e7;
  color: #17562a;
  border-radius: 8px;
  padding: 12px 16px;
  position: fixed;
  top: 16px;
  right: 16px;
}
@media (max-width: 760px) {
  .main { margin: 24px auto; }
}
</style>
