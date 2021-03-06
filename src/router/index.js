import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/HomePage/Home'
import Login from '@/components/pages/LoginPage/Login'
import Logout from '@/components/pages/LogoutPage/Logout'
import Registration from '@/components/pages/RegistrationPage/Registration'
import SurveyList from '@/components/pages/SurveyListPage/SurveyList'
import SurveyCreate from '@/components/pages/SurveyCreatePage/SurveyCreate'
import SurveyUpdate from '@/components/pages/SurveyUpdatePage/SurveyUpdate'
import SurveyDetail from '@/components/pages/SurveyDetailPage/SurveyDetail'
import QuestionDetail from '@/components/pages/QuestionDetailPage/QuestionDetail'
import ResultList from '@/components/pages/ResultListPage/ResultList'
import ResultDetail from '@/components/pages/ResultDetailPage/ResultDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/survey/list',
      name: 'SurveyList',
      component: SurveyList
    },
    {
      path: '/survey/create',
      name: 'SurveyCreate',
      component: SurveyCreate
    },
    {
      path: '/survey/get/:id',
      name: 'SurveyDetail',
      component: SurveyDetail,
      props: true
    },
    {
      path: '/survey/update/:id',
      name: 'SurveyUpdate',
      component: SurveyUpdate,
      props: true
    },
    {
      path: '/question/:id',
      name: 'QuestionDetail',
      component: QuestionDetail,
      props: true
    },
    {
      path: '/result/list',
      name: 'ResultList',
      component: ResultList
    },
    {
      path: '/result/:id',
      name: 'ResultDetail',
      component: ResultDetail,
      props: true
    }
  ]
})
