<template>
  <form-dialog @close="hideDialog">
    <form @submit.prevent>
    <h3>Добавление пользователя<span @click="hideDialog">&times;</span></h3>

    <div v-for="item in inputData" :key="item.name" class="input">
      <label :for="item.name">{{ item.title }}</label>
      <input v-model="user[item.name]" :name="item.name">
    </div>

    <div class="input">
      <label for="chief">Начальник</label>

      <select name="chief" v-model="chiefId">
        <option value="null"></option>
        <option
        v-for="user in getAllUsers"
        :key="user.id"
        :value="user.id"
        >
          {{ user.name }}
        </option>
      </select>

    </div>

    <div class="error" v-if="error !== null">{{ error }}</div>
    <button @click="validateForm">Сохранить</button>

  </form>
  </form-dialog>
</template>

<script>
import FormDialog from './FormDialog'

export default {
  name: 'add-user-dialog',
  components: {
    FormDialog
  },
  props: {
    inputData: {
      type: Array,
      required: true
    },
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      user: {
        name: null,
        phone: null
      },
      chiefId: null,
      error: null
    }
  },
  methods: {
    createUser () {
      this.user.id = Date.now()
      this.user.subordinates = []
      this.$emit('createUser', this.user, this.chiefId)
      this.user = {
        name: null,
        phone: null
      }
      this.chief = null
    },
    hideDialog () {
      this.$emit('close')
    },
    validateForm () {
      this.error = null
      try {
        if (this.user.name === null || this.user.phone === null) {
          throw new Error('Нужно заполнить все поля!')
        }
        if (!/^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(this.user.phone)) {
          throw new Error('Неверно указан номер телефона!')
        }
        this.createUser()
      } catch (error) {
        this.error = error.message
      }
    }
  },
  computed: {
    getAllUsers () {
      function getUsers (usersArr) {
        const allUsers = usersArr.reduce((acc, user) => {
          acc.push(user)
          if (user.subordinates.length > 0) {
            acc = [...acc, ...getUsers(user.subordinates)]
          }
          return acc
        }, [])
        return allUsers
      }
      return getUsers(this.users)
    }
  }
}
</script>

<style scoped>
input {
    width: 60%;
    padding: 1px 2px;
}
select {
    width: 62.4%;
    padding: 1px 2px;
}
label {
    text-align: left;
}
.input {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

h3 {
    font-weight: normal;
    padding: 0;
    margin: 0 0 10px 0;
}

button {
    width: 60%;
    margin-top: 15px;
    padding: 7px;
}
span {
    float: right;
    margin-right: -10px;
    color: black;
    font-size: 16px;
    font-weight: bold;
}
.error {
  display: block;
  color: red;
  text-align: end;
}
</style>
