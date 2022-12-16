import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/routComponents/MainPage'
import LoginForm from '../components/routComponents/LoginFormPage'
import RegistrationPage from "@/components/routComponents/RegistrationPage";
import PersonalAreaPage from "@/components/routComponents/PersonalAreaPage";
import AllStudentsPage from "@/components/routComponents/teacherComponents/AllStudentsPage";
import ResultPage from "@/components/routComponents/teacherComponents/TeacherResultPage";
import TeacherTestsPage from "@/components/routComponents/teacherComponents/TeacherTestsPage";
import AnalyticsDataPage from "@/components/routComponents/teacherComponents/AnalyticsDataPage";
import StudentResultPage from "@/components/routComponents/studentComponents/StudentResultPage";
import StudentTestingPage from "@/components/routComponents/studentComponents/StudentTestingPage";
import StartingTesting from "@/components/routComponents/studentComponents/StartingTesting";
import StudentGroup from "@/components/routComponents/studentComponents/StudentGroupPage";

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/auth',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/registration',
    name: 'RegistrationPage',
    component: RegistrationPage
  },
  {
    path: '/personalArea',
    name: 'PersonalAreaPage',
    component: PersonalAreaPage
  },
  {
    path: '/allStudents',
    name: 'AllStudentsPage',
    component: AllStudentsPage
  },
  {
    path: '/Results',
    name: 'ResultPage',
    component: ResultPage
  },
  {
    path: '/TeacherTests',
    name: 'TeacherTestsPage',
    component: TeacherTestsPage
  },
  {
    path: '/AnalyticsData',
    name: 'AnalyticsDataPage',
    component: AnalyticsDataPage
  },
  {
    path: '/StudentResult',
    name: 'StudentResultPage',
    component: StudentResultPage
  },
  {
    path: '/StudentTesting',
    name: 'StudentTestingPage',
    component: StudentTestingPage,
    props: true
  },
  {
    path: '/StartingTesting',
    name: 'StartingTesting',
    component: StartingTesting,
    props: true
  },
  {
    path: '/StudentGroup',
    name: 'StudentGroup',
    component: StudentGroup,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
