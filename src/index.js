import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/img1.jpg'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    // 将组件渲染成html
    render: (h)=> h(App)
}).$mount(root)
// $mount将html挂在到一个节点上