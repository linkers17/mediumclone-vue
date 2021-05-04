import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from "@/views/RegisterComponent";

const routes = [
  {
    path: '/',
    name: 'home',
    component: RegisterComponent
  },
  {
    path: '/',
    name: 'login',
    component: RegisterComponent
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
