<template>
  <form-dialog @close="hideDialog">
    <form @submit.prevent="validateForm">
    <h3>Добавление пользователя<button class="close" type="button" aria-label="Закрыть" @click="hideDialog">&times;</button></h3>

    <div v-for="item in inputData" :key="item.name" class="input">
      <label :for="item.name">{{ item.title }}</label>
      <input v-model.trim="user[item.name]" :id="item.name" :name="item.name">
    </div>

    <div class="input">
      <label for="chief">Начальник</label>

      <select id="chief" name="chief" v-model="user.chiefId">
        <option :value="null">Без начальника</option>
        <option
        v-for="user in users"
        :key="user.id"
        :value="user.id"
        >
          {{ user.name }}
        </option>
      </select>

    </div>

    <div class="error" v-if="error !== null">{{ error }}</div>
    <button type="submit">Сохранить</button>

  </form>
  </form-dialog>
</template>

<script>
import FormDialog from '../UI/ModalDialog.vue'
import { validName } from '../utils/users'

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
        phone: null,
        chiefId: null
      },
      error: null
    }
  },
  methods: {
    createUser () {
      this.user.id = Date.now()
      this.$emit('createUser', this.user)
      this.user = {
        name: null,
        phone: null,
        chiefId: null
      }
    },
    validateForm () {
      this.error = null
      try {
        if (!validName(this.user.name) || !this.user.phone) {
          throw new Error('Нужно заполнить все поля!')
        }
        if (!/^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(this.user.phone)) {
          throw new Error('Неверно указан номер телефона!')
        }
        this.createUser()
      } catch (error) {
        this.error = error.message
      }
    },
    hideDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
}
h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  margin: 0 0 18px;
}
input, select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e4;
  border-radius: 6px;
  background: white;
  color: inherit;
  font: inherit;
}
input:focus, select:focus { outline: 2px solid #94b7ff; }
button[type="submit"] {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  background: #315fbb;
  color: white;
  cursor: pointer;
  font: inherit;
}
.close {
  border: 0;
  background: none;
  color: #52617b;
  cursor: pointer;
  font-size: 24px;
}
.error {
  color: #b42318;
  margin-top: 12px;
}
</style>
