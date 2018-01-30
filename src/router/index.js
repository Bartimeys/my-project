import Vue from 'vue'
import Router from 'vue-router'
import BasicComponent from '@/components/BasicComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BasicComponent',
      component: BasicComponent
    }
  ]
})
