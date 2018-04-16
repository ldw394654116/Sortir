import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'Vuex'
import Index from './views/index.vue'
import Page from './views/page.vue'
import store from './js/store.js'

Vue.use(VueRouter)


/* eslint-disable no-new */
var router = new VueRouter({
  routes: [
    { name: 'index',  path: '/index', component: Index },
    { name: 'page',  path: '/page', component: Page },
  ]
})
new Vue({
    el: '#app',
  router: router,
  store,
  render: h => h(App)
})


router.push("/index")
