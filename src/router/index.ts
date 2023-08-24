import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/category.vue')
    },
    {
      path: '/param',
      name: 'param',
      component: () => import('../views/param.vue')
    },
    {
      path:'/product',
      name:'product',
      component: () => import('@/views/product.vue')
    }
  ]
})

export default router
