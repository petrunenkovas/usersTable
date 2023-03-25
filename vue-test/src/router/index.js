import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/layout/BaseLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: BaseLayout
    }
  ]
})
