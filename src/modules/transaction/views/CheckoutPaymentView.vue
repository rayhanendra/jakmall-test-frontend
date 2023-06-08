<template>
  <div class="payment">
    <div class="payment__item">
      <BaseFormTitle title="Shipment" />
      <CheckoutPaymentChoices
        :select="shipment"
        :choiceOptions="shipmentOptions"
        @select="handleShipment"
      />
    </div>
    <div class="payment__item">
      <BaseFormTitle title="Payment" />
      <CheckoutPaymentChoices
        :select="payment"
        :choiceOptions="paymentOptions"
        @select="handlePayment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseFormTitle from '@/core/components/BaseFormTitle.vue'
import { ref, watch } from 'vue'
import CheckoutPaymentChoices from '@/modules/transaction/components/CheckoutPaymentChoices.vue'
import { useCheckoutStore } from '@/stores'
import { storeToRefs } from 'pinia'

const checkoutStore = useCheckoutStore()
const { checkout } = storeToRefs(checkoutStore)

const shipmentOptions = [
  {
    label: 'GO-SEND',
    value: 'gosend',
    price: 15000,
    duration: 'Today'
  },
  {
    label: 'JNE',
    value: 'jne',
    price: 9000,
    duration: '2 days'
  },
  {
    label: 'Personal Courier',
    value: 'personal-courier',
    price: 29000,
    duration: '1 day'
  }
]

const paymentOptions = [
  {
    label: 'e-Wallet',
    value: 'e-wallet',
    money: 100000
  },
  {
    label: 'Bank Transfer',
    value: 'bank-transfer'
  },
  {
    label: 'Virtual Account',
    value: 'virtual-account'
  }
]

const shipment = ref('')
const payment = ref('')

watch(
  checkout.value.shipment,
  () => {
    if (checkout.value.shipment) {
      shipment.value = checkout.value.shipment.value
    }
  },
  {
    immediate: true
  }
)

watch(
  checkout.value.payment,
  () => {
    if (checkout.value.payment) {
      payment.value = checkout.value.payment.value
    }
  },
  {
    immediate: true
  }
)

const handleShipment = (value: string) => {
  shipment.value = value
  checkoutStore.setShipment(shipmentOptions.find((option) => option.value === value)!)
}

const handlePayment = (value: string) => {
  payment.value = value
  checkoutStore.setPayment(paymentOptions.find((option) => option.value === value)!)
}
</script>

<style scoped lang="stylus">
.payment
  &__item
    display flex
    flex-direction column
    gap 20px
    margin-bottom 4rem
    &:last-child
      margin-bottom 0
</style>