import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from "@/views/RegisterComponent";
import LoginComponent from "@/views/LoginComponent";
import GlobalFeedComponent from "@/views/GlobalFeedComponent";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  },
  {
    path: '/',
    name: 'home',
    component: GlobalFeedComponent
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: GlobalFeedComponent
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeedComponent
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeedComponent
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeedComponent
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: GlobalFeedComponent
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeedComponent
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeedComponent
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeedComponent
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
