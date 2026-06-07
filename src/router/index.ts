import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import One from '@/views/pages/1on1.vue'
import Two from '@/views/pages/2on2.vue'
import Champions from '@/views/pages/Champions.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/1on1',
    name: '1on1',
    component: One,
  },
  {
    path: '/2on2',
    name: '2on2',
    component: Two,
  }

  ,

  {
    path: '/champions',
    name: 'Champions',
    component: Champions
  },

  {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/404.vue')
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router