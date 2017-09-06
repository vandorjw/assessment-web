import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SurveyList from '@/components/SurveyList'
import SurveyDetail from '@/components/SurveyDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/surveys',
      name: 'SurveyList',
      component: SurveyList
    },
    {
      path: '/survey/:id',
      name: 'SurveyDetail',
      component: SurveyDetail,
      props: true
    }
  ]
})
