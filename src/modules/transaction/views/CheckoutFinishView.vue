<template>
  <div class="finish">
    <div>
      <BaseFormTitle title="Thank You" />
      <div class="finish__order-id">Order ID : {{ orderId }}</div>
      <div class="finish__shipment">
        Your order will be delivered today with {{ checkout.shipment.label }}
      </div>
      <router-link to="/" class="finish__link">Go to Homepage</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseFormTitle from '@/core/components/BaseFormTitle.vue'
import { useCheckoutStore } from '@/stores'
import { storeToRefs } from 'pinia'

const checkoutStore = useCheckoutStore()
const { checkout } = storeToRefs(checkoutStore)

const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
let orderId = ''

// Note: Generate a random 5-digit alphanumeric order ID
for (let i = 0; i < 5; i++) {
  const randomIndex = Math.floor(Math.random() * characters.length)
  orderId += characters[randomIndex]
}
</script>

<style scoped lang="stylus">
.finish
    height 100%
    display flex
    justify-content center
    align-items center

    &__order-id
        font-size 14px
        margin-bottom 10px

    &__shipment
        opacity 0.6
        margin-bottom 40px

    &__link
        font-size 14px
        font-weight 600
        color #FF8A00
        text-decoration underline
</style>
