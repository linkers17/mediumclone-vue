import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from "@/views/RegisterComponent";
import LoginComponent from "@/views/LoginComponent";
import GlobalFeedComponent from "@/views/GlobalFeedComponent";
import YourFeedComponent from "@/views/YourFeedComponent";
import TagFeedComponent from "@/views/TagFeedComponent";
import ArticleComponent from "@/views/ArticleComponent";
import CreateArticleComponent from "@/views/CreateArticleComponent";
import EditArticleComponent from "@/views/EditArticleComponent";
import SettingsComponent from "@/views/SettingsComponent";

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
    component: YourFeedComponent
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeedComponent
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: CreateArticleComponent
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: EditArticleComponent
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: ArticleComponent
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsComponent
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
