<template>
  <div id="app">
    <div class="header-box">
      <h1 class="header-title">TodoList</h1>
      <button class="button_add" v-if="!isAdd" @click="isAdd=true">+</button>
      <div class="filter">
        <label for="filter_select" class="filter__label">Фильтр</label>
        <select class="filter__select" v-model="typeForFilter" id="filter_select">
          <option class="filter__option" value="0">Все</option>
          <option class="filter__option" v-for="type in getTypes"
                  :key="type.id" :value="type.id"
          >{{ type.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="message" v-if="!isAdd && allTodos.length === 0">Список задач пока пуст</div>
    <todo-form v-if="isAdd" @add="add" @cancel="isAdd=false"></todo-form>
    <div class="todos-box" v-if="!isAdd">
      <todo-item class="todos-box__item" :class="{'todo-item_done': todoItem.done , 'todo-item_act': !todoItem.done}"
                 v-for="todoItem in todoFilter"
                 :key="todoItem.id" :todo-item="todoItem"
                 @del="del"
                 @done="done"
      />
    </div>
  </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import TodoForm from "./components/TodoForm";
    import TodoItem from "./components/TodoItem";

    export default {
        name: 'App',
        components: {
            TodoForm, TodoItem
        },
        data() {
            return {
                isAdd: false,
                typeForFilter: 0
            }
        },
        computed: {
            ...mapGetters(['allTodos', 'getTypes']),
            todoFilter() {
                if (this.typeForFilter > 0) {
                    return this.allTodos.filter(t => t.type_id === this.typeForFilter)
                } else {
                    return this.allTodos
                }
            }
        },
        methods: {
            ...mapMutations(['addTodo', 'delTodo', 'doneTodo']),
            add(e) {
                this.addTodo(e)
                this.isAdd = false
            },
            del(e) {
                this.delTodo(e)
            },
            done(e) {
                this.doneTodo(e)
            }
        }
    }
</script>

<style>
  .container {
    max-width: 1170px;
    margin: 0 auto;
  }

  * {
    /*outline: bisque solid 1px;*/
  }

  .message {
    margin: 30px 0;
    font-size: 30px;
  }

  .header-box {
    margin-bottom: 20px;
    display: flex;
    padding: 10px 20px;
    justify-content: left;
    align-items: center;
    background-color: #fae7db;
  }

  .header-title {
    margin-right: 20px;
  }

  .button_add {
    font-size: 34px;
    font-weight: bold;
    width: 50px;
    height: 50px;
    color: white;
    background-color: #ffb36e;
    border: coral solid 2px;
    border-radius: 50%;
  }

  .filter {
    margin-left: auto;
    padding: 10px;
  }

  .filter__label {
    margin-right: 10px;
    font-size: 24px;
    font-weight: bold;
  }

  .filter__select {
    font-size: 22px;
    min-width: 150px;
  }

  .todos-box {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    min-width: 220px;
  }

  .todos-box__item {
    margin: 0;
    width: calc((100% - 130px) / 4);
  }

  .todos-box__item:not(:nth-child(4n)) {
    margin: 0 10px 10px 0;
  }

  .todos-box__item:nth-child(4n) {
    margin: 0 0 10px 0;
  }

  .todo-item_done {
    background-color: #d3efe4;
    border: #42b983 solid 2px;
  }

  .todo-item_act {
    background-color: #f8dfdf;
    border: #780701 solid 2px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 30px -15px 0 -15px;
    padding: 15px;
  }

  @media (max-width: 960px) {
    .todos-box__item {
      margin: 0;
      width: calc((100% - 100px) / 3);
    }

    .todos-box__item:not(:nth-child(3n)) {
      margin: 0 10px 10px 0;
    }

    .todos-box__item:nth-child(3n) {
      margin: 0 0 10px 0;
    }

    .button-box {
      flex-wrap: nowrap;
    }

    .todo-item__button {
      width: 100%;
    }

    .button_delete,
    .button_success {
      margin: 0;
    }

  }

  @media (max-width: 650px) {
    .todos-box__item {
      margin: 0;
      flex: 1 1;
      width: calc((100% - 80px) / 2);
    }

    .todos-box__item:not(:nth-child(2n)) {
      margin: 0 10px 10px 0;
    }

    .todos-box__item:nth-child(2n) {
      margin: 0 0 10px 0;
    }
  }

  @media (max-width: 560px) {
    .todos-box {
      flex-direction: column;
    }

    .todos-box__item {
      margin: 0 0 10px;
      width: 100%;
    }

    .header-box {
      flex-wrap: wrap;
      justify-content: center;
    }

    .filter {
      margin: 0;
    }

  }
</style>
