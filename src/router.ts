import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/core/views/HomeView.vue')
    },
    {
      path: '/checkout/:slug',
      name: 'Checkout',
      component: () => import('@/modules/transaction/views/CheckoutView.vue')
    }
  ]
})

export default router
