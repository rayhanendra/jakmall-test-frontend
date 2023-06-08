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
      component: () => import('@/modules/transaction/views/CheckoutView.vue'),
      redirect: { name: 'Delivery' },
      children: [
        {
          path: 'delivery',
          name: 'Delivery',
          component: () => import('@/modules/transaction/views/CheckoutDeliveryView.vue')
        },
        {
          path: 'payment',
          name: 'Payment',
          component: () => import('@/modules/transaction/views/CheckoutPaymentView.vue')
        },
        {
          path: 'finish',
          name: 'Finish',
          component: () => import('@/modules/transaction/views/CheckoutFinishView.vue')
        }
      ]
    }
  ]
})

export default router
