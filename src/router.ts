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
          component: () => import('@/modules/transaction/views/CheckoutDeliveryView.vue'),
          meta: {
            step: 1
          }
        },
        {
          path: 'payment',
          name: 'Payment',
          component: () => import('@/modules/transaction/views/CheckoutPaymentView.vue'),
          meta: {
            step: 2
          }
        },
        {
          path: 'finish',
          name: 'Finish',
          component: () => import('@/modules/transaction/views/CheckoutFinishView.vue'),
          meta: {
            step: 3
          }
        }
      ]
    }
  ]
})

export default router
