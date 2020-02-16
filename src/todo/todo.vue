<template>
    <section>
        <input 
            type="text" 
            class="add"
            autofocus
            placeholder="接下来我要..."
            @keyup.enter="addTodo"
        >
        <Item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAllCompleted="clearAllCompleted"></Tabs>
    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
    components:{
        Item,Tabs
    },
    data(){
        return{
            todos: [],
            filter: 'all'
        }
    },
    computed:{
        filteredTodos(){
            if(this.filter === 'all'){
                return this.todos
            }
            const completed = this.filter === 'completed'
            return this.todos.filter(todo => todo.completed === completed)
        },
    },
    methods: {
        addTodo(e){
            if(e.target.value.trim() !== ''){
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ''
            }
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
        },
        toggleFilter(state){
            this.filter = state
        },
        clearAllCompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    },
}
</script>

<style lang="stylus" scoped>
    section 
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    .add
        position relative
        top 0
        left 0
        width 100%
        font-size 24px
        line-height 1.4em
        border 1px solid #999
        box-sizing border-box
        padding 16px 16px 16px 60px
        color #444
</style>