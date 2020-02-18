<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <!-- 添加key属性，使数据在发生变化时才更新，避免重复生成节点 -->
        <span 
            v-for="state in states" 
            :key="state" 
            :class="['state', filter == state ? 'active' : '']"
            @click="toggleFilter(state)"
        >
            {{state}}
        </span>
        <span class="clear" @click="clearAllCompleted">Clear completed</span>
    </div>
</template>

<script>
export default {
    props: {
        filter: {
            type: String,
            required: true
        },
        todos:{
            type: Array,
            required: true
        }
    },
    data(){
        return {
            states:['all','active','completed']
        }
    },
    computed: {
        unFinishedTodoLength(){
            return this.todos.filter(todo => !todo.completed).length
        }
    },
    methods:{
        toggleFilter(state){
            this.$emit('toggle',state)
        },
        clearAllCompleted(){
            this.$emit('clearAllCompleted')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .helper
        height 50px
        background-color #fff
        color #666
        font-weight 500
        padding 12px 10px 0 12px
        box-sizing border-box 
        line-height 25px    
        .left
            margin-right 110px
        .state
            display inline-block
            height 25px
            padding 0 5px  
            cursor pointer
            &.active
                border 1px solid #bbb
                border-radius 3px
        .clear
            float right 
            cursor pointer
            
</style>