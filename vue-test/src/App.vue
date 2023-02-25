<template>
  <div id="app">
    <button @click="showDialog">Добавить</button>

    <add-user-dialog
    v-if="shownDialog"
    :inputData="headers"
    :users="users"
    @createUser="createUser"
    @close="closeDialog"
    />

    <users-table
    :users="users"
    :headers="headers"
    :sortAsc="sortAsc"
    @sort="sortUsers"
    />

    <div class="savedUser" v-show="shownSavedUser">Пользователь успешно создан</div>
  </div>
</template>

<script>
import UsersTable from './components/UsersTable/App.vue'
import AddUserDialog from './components/AddUserDialog/App.vue'

export default {
  name: 'App',
  components: {
    UsersTable,
    AddUserDialog
  },
  data () {
    return {
      users: [],
      headers: [{name: 'name', title: 'Имя'}, {name: 'phone', title: 'Телефон'}],
      shownDialog: false,
      shownSavedUser: false,
      sortAsc: 0
    }
  },
  methods: {
    createUser (newUser, chiefId) {
      if (chiefId === null) {
        this.users.push(newUser)
      } else {
        Number(chiefId)
        function addUser (userArr, chiefId, userToAdd) {
          return userArr.forEach((user) => {
            if (user.id === chiefId) {
              user.subordinates.push(userToAdd)
            } else if (user.subordinates.length > 0) {
              addUser(user.subordinates, chiefId, userToAdd)
            }
          })
        }
        addUser(this.users, chiefId, newUser)
      }
      localStorage.setItem('users', JSON.stringify(this.users))
      this.closeDialog()
      this.shownSavedUser = true
      setTimeout(() => this.shownSavedUser = false, 2000)
    },
    sortUsers (selectedSort) {
      let sortAsc = this.sortAsc = (this.sortAsc === 0 || this.sortAsc === -1) ? 1 : -1
      function sortUsersByProp (usersArr, selectedSort) {
        usersArr.sort((user1, user2) => {
          if (user1[selectedSort] > user2[selectedSort]) {
            return sortAsc
          }
          if (user1[selectedSort] < user2[selectedSort]) {
            return -sortAsc
          }
          return 0
        })
        usersArr.forEach((user) => {
          if (user.subordinates.length > 0) {
            sortUsersByProp(user.subordinates, selectedSort)
          }
        })
      }
      sortUsersByProp(this.users, selectedSort)
    },
    showDialog () {
      this.shownDialog = true
    },
    closeDialog () {
      this.shownDialog = false
    }
  },
  mounted () {
    this.users = JSON.parse(localStorage.getItem('users')) || []
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: flex-end;
  font-size: 16px;
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
