import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import SurveyList from '@/components/SurveyList'
import SurveyCreate from '@/components/SurveyCreate'
import SurveyDetail from '@/components/SurveyDetail'
import QuestionDetail from '@/components/QuestionDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/surveys',
      name: 'SurveyList',
      component: SurveyList
    },
    {
      path: '/surveys/create',
      name: 'SurveyCreate',
      component: SurveyCreate
    },
    {
      path: '/survey/:id',
      name: 'SurveyDetail',
      component: SurveyDetail,
      props: true
    },
    {
      path: '/question/:id',
      name: 'QuestionDetail',
      component: QuestionDetail,
      props: true
    }
  ]
})
