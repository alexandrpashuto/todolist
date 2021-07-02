import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {},
    mutations: {
        addTodo(state,todo){
            state.todos.push(todo);
        },
        delTodo(state,id){
            state.todos =  state.todos.filter(t => t.id !== id)
        },
        doneTodo(state,id){
            const idx = state.todos.findIndex(t => t.id === id)
            state.todos[idx].done = true
        }
    },
    state: {
        todos: [],
        types:[
            {id:1,name:'type 1'},
            {id:2,name:'type 2'},
            {id:3,name:'type 3'},
        ]
    },
    getters: {
        allTodos(state) {
            return state.todos
        },
        getTypes(state){
            return state.types
        }
    }
})