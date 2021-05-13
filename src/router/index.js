import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from "@/views/RegisterComponent";
import LoginComponent from "@/views/LoginComponent";
import GlobalFeedComponent from "@/views/GlobalFeedComponent";

const routes = [
  {
    path: '/',
    name: 'home',
    component: GlobalFeedComponent
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
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
