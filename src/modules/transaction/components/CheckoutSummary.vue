<template>
  <div class="summary__title">Summary</div>
  <div class="summary__main">
    <div class="summary__main__content">
      <div class="summary__main__content__total" v-if="summary.itemsPurchased !== 0">
        {{ summary.itemsPurchased }} items purchased
      </div>
      <div
        class="summary__main__content__divider"
        :class="{ 'summary__main__content__divider--hidden': isShipmentHidden }"
      ></div>
      <div
        class="summary__main__content__item"
        :class="{ 'summary__main__content__item--hidden': isShipmentHidden }"
      >
        <div class="summary__main__content__item__label">Delivery estimation</div>
        <div class="summary__main__content__item__value">
          {{ shipment.duration }} by {{ shipment.label }}
        </div>
      </div>
      <div
        class="summary__main__content__divider"
        :class="{ 'summary__main__content__divider--hidden': isPaymentHidden }"
      ></div>
      <div
        class="summary__main__content__item"
        :class="{ 'summary__main__content__item--hidden': isPaymentHidden }"
      >
        <div class="summary__main__content__item__label">Payment method</div>
        <div class="summary__main__content__item__value">{{ payment.label }}</div>
      </div>
    </div>
    <div class="summary__main__pricing">
      <div class="summary__main__pricing__item">
        <div class="summary__main__pricing__item__label">Cost of goods</div>
        <div class="summary__main__pricing__item__value">
          {{ $filters.formatCurrency(summary.cost) }}
        </div>
      </div>
      <div v-if="dropshipper" class="summary__main__pricing__item">
        <div class="summary__main__pricing__item__label">Dropshipping Free</div>
        <div class="summary__main__pricing__item__value">
          {{ $filters.formatCurrency(summary.dropshipping) }}
        </div>
      </div>
      <div class="summary__main__pricing__item">
        <div class="summary__main__pricing__item__label">
          <b>
            {{ shipment.label }}
          </b>
          shipment
        </div>
        <div class="summary__main__pricing__item__value">
          {{ $filters.formatCurrency(summary.shipment) }}
        </div>
      </div>
      <div class="summary__main__pricing__total">
        <div class="summary__main__pricing__total__label">Total</div>
        <div class="summary__main__pricing__total__value">
          {{ $filters.formatCurrency(summary.total) }}
        </div>
      </div>
      <BaseButton v-if="isButtonVisible" :disabled="isButtonDisabled">{{ buttonLabel }}</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/core/components/BaseButton.vue'
import { useCheckoutStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed, reactive, watch } from 'vue'

const checkoutStore = useCheckoutStore()
const { checkout, activeStep, dropshipper } = storeToRefs(checkoutStore)

const buttonLabel = computed(() => {
  switch (activeStep.value) {
    case 1:
      return 'Continue to Payment'
    case 2:
      return `Pay with ${checkout.value.payment.label}`
    case 3:
      return 'Finish'
    default:
      return ''
  }
})

const summary = reactive({
  itemsPurchased: 10,
  cost: 500000,
  dropshipping: 0,
  shipment: checkout.value.shipment.price,
  total: 0
})

const shipment = reactive({
  duration: checkout.value.shipment.duration,
  label: checkout.value.shipment.label
})

const payment = reactive({
  label: checkout.value.payment.label
})

const isShipmentHidden = computed(() => shipment.label === '')
const isPaymentHidden = computed(() => payment.label === '')
const isButtonVisible = computed(() => activeStep.value !== 3)
const isButtonDisabled = computed(
  () =>
    activeStep.value === 2 &&
    (checkout.value.shipment.label === '' || checkout.value.payment.label === '')
)

watch(
  () => checkoutStore.checkout.shipment.price,
  (value) => {
    summary.shipment = value
  }
)

watch(
  () => checkoutStore.checkout.shipment,
  (value) => {
    shipment.duration = value.duration
    shipment.label = value.label
  }
)

watch(
  () => checkout.value.payment,
  (value) => {
    payment.label = value.label
  }
)

watch(
  () => dropshipper.value,
  (value) => {
    summary.dropshipping = value ? 5900 : 0
  },
  {
    immediate: true
  }
)

watch(
  () => summary,
  (value) => {
    summary.total = value.cost + value.shipment + value.dropshipping
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style scoped lang="stylus">

.summary

    &__title
      font-family 'Montserrat'
      font-size 24px
      font-weight bold
      color #FF8A00

    &__main
      height 100%
      display flex
      flex-direction column
      justify-content space-between

      &__content
        display flex
        flex-direction column
        gap 20px

        @media (max-width: 768px)
          gap 10px
          margin-bottom 40px

        &__total
          margin-top 10px
          font-size 14px
          color #666666

        &__divider
          border 1px solid #D8D8D8
          width 30%
          margin 10px 0

          &--hidden
            display none

        &__item
          display flex
          flex-direction column
          gap 4px

          &__label
            font-size 14px
            color #000000

          &__value
            margin-top 4px
            font-size 16px
            color #1BD97B
            font-weight 600

          &--hidden
            display none

      &__pricing
        display flex
        flex-direction column
        gap 10px

        &__item
          display flex
          justify-content space-between
          font-size 14px

          &__label
            font-weight 500
            color #666666

          &__value
            font-weight bold
            color #000000

        &__total
          margin-top 24px
          margin-bottom 24px
          display flex
          justify-content space-between
          font-size 24px
          font-weight bold
          color #FF8A00
</style>
