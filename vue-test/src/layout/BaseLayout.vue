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
      return [...this.users].sort((user1, user2) => {
        if (user1[this.selectedSort.field] > user2[this.selectedSort.field]) {
          return this.selectedSort.ascending
        }
        if (user1[this.selectedSort] < user2[this.selectedSort]) {
          return -this.selectedSort.ascending
        }
        return 0
      })
    },
    groupedUsersToView () {
      let groupedUsers = []
      this.sortUsersByProp.forEach((userMaped) => {
        userMaped.subordinates = this.sortUsersByProp.filter((userFiltered) => userMaped.id === userFiltered.chiefId) || []
        if (userMaped.chiefId == null) {
          groupedUsers.push(userMaped)
        }
      })
      return groupedUsers
    }
  },
  mounted () {
    this.users = JSON.parse(localStorage.getItem('users')) || []
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: flex-end;
}
button {
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 13px;
  margin: 20px 0;
  width: auto;
  padding: 5px 20px;
}
.savedUser {
  background-color: lightgreen;
  border: 1px solid black;
  border-radius: 13px;
  padding: 20px 20px;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
