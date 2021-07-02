<template>
  <div class="todo-add">
    <h2 class="todo-add_title">Новое задание</h2>

    <form class="todo-form" @submit.prevent="submit">
      <label class="todo-form_label" for="name">Название</label>
      <input class="todo-form__input" type="text" required placeholder="Название" v-model="todo.name" id="name">

      <label class="todo-form_label" for="type">Тип</label>
      <select name="type" id="type" class="todo-form__input todo-form__select" v-model="todo.type_id">
        <option v-for="type in getTypes" :value="type.id" :key="type.id" class="select_option">{{ type.name }}</option>
      </select>

      <label class="todo-form_label" for="desc">Описание задачи</label>
      <textarea class="todo-form__input" minlength="10" rows="5" placeholder="Содержание" v-model="todo.desc"
                id="desc"></textarea>

      <label class="todo-form_label" for="date-end">Дата выполения</label>
      <input class="todo-form__input" type="date" v-model="todo.date" id="date-end">

      <div class="button-box">
        <button class="todo-form__button form_button_cancel" @click.prevent="cancel">Отменить</button>
        <button class="todo-form__button form_button_add" type="submit" :disabled="!addEnabled">Добавить</button>
      </div>
    </form>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "TodoForm",
        data() {
            return {
                todo: {
                    id: Date.now(),
                    name: '',
                    type_id: 0,
                    desc: '',
                    date: '',
                    done: false
                }
            }
        },
        computed: {
            ...mapGetters(['getTypes']),
            addEnabled() {
                return this.todo.name.trim().length > 2 &&
                    this.todo.desc.trim().length > 10 &&
                    this.getTime >= this.getNow &&
                    this.todo.type_id > 0
            },
            getNow() {
                const d = new Date()
                return (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime()
            },
            getTime() {
                const d = new Date(this.todo.date)
                return (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime()
            }
        },
        mounted() {
            const d = new Date()
            this.todo.date = d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2)
        },
        methods: {

            submit() {
                this.$emit('add', this.todo)
            },
            cancel() {
                this.$emit('cancel')
            }
        }
    }
</script>

<style>
  .todo-add_title {
    font-size: 36px;
  }

  .todo-form {
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    max-width: 400px;
  }

  .todo-form__input {
    font-size: 20px;
  }

  .button-box {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .todo-form_label {
    padding-bottom: 5px;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
  }

  .todo-form_label:not(:first-child) {
    margin-top: 15px;
  }

  .todo-form__button {
    padding: 15px 30px;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    font-size: 16px;
  }

  .form_button_cancel {
    background-color: #1055a3;
  }

  .form_button_add {
    background-color: #ba5707;
  }

  .form_button_add[disabled] {
    background-color: #e0baa0;
    color: #6c6b6b;
  }

</style>