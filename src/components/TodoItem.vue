<template>
  <div class="todo-item">
    <h3 class="todo-item__title">{{ todoItem.name }}</h3>
    <span class="todo-item__date">{{ todoItem.date }}</span>
    <div class="todo-item__type-box">
      <span class="todo-item__type-label">Тип:</span>
      <span class="todo-item__type-name">{{ getTypeName }}</span>
    </div>
    <p class="todo-item__desc">{{ todoItem.desc }}</p>
    <div class="bottom-box">
      <button class="todo-item__button button_delete"
              @click.prevent="delTodo"
      >Удалить
      </button>
      <button class="todo-item__button button_success"
              :disabled="todoItem.done"
              @click.prevent="done"
      >Выполнено
      </button>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "TodoItem",
        props: ['todoItem'],
        computed: {
            ...mapGetters(['getTypes']),
            getTypeName() {
                const type = this.getTypes.find(t => t.id === this.todoItem.type_id)
                return type.name
            }
        },
        methods: {
            delTodo() {
                this.$emit('del', this.todoItem.id)
            },
            done() {
                this.$emit('done', this.todoItem.id)
            }
        }

    }
</script>

<style>
  .todo-item {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }

  .todo-item__desc {
    max-height: 150px;
    overflow-y: auto;
  }

  .todo-item__type-box {
    margin: 10px 0;
  }

  .todo-item__type-label {
    font-weight: bold;
    margin-right: 10px;
  }

  .todo-item__desc {
    margin: 0 0 10px 0;
  }

  .bottom-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: auto;
    padding: 10px;
  }

  .todo-item__button {
    padding: 5px 20px;
    font-weight: bold;
    flex-shrink: 1;
    width: 100%;
  }

  .todo-item__button:not(:last-child) {
    margin: 0 0 10px 0;
  }

  .button_delete {
    background-color: #d9d0d2;
    color: #5a040f;
  }

  .button_success {
    background-color: #c6f6e7;
    color: #054211;
  }
</style>