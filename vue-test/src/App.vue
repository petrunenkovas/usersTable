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
    @sort="sortUsers"
    />
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
      shownDialog: false
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
    },
    sortUsers (selectedSort) {
      function sortUsersByProp (usersArr, selectedSort) {
        usersArr.sort((user1, user2) => {
          if (user1[selectedSort] > user2[selectedSort]) {
            return 1
          }
          if (user1[selectedSort] < user2[selectedSort]) {
            return -1
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
</style>
