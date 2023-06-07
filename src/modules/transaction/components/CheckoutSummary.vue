<template>
  <div class="summary__title">Summary</div>
  <div class="summary__main">
    <div class="summary__main__content">
      <div class="summary__main__content__total">{{ itemsPurchased }} items purchased</div>
      <div class="summary__main__content__divider"></div>
      <div class="summary__main__content__item">
        <div class="summary__main__content__item__label">Delivery estimation</div>
        <div class="summary__main__content__item__value">{{ deliveryEstimation }}</div>
      </div>
      <div class="summary__main__content__divider"></div>
      <div class="summary__main__content__item">
        <div class="summary__main__content__item__label">Payment method</div>
        <div class="summary__main__content__item__value">{{ paymentMethod }}</div>
      </div>
    </div>
    <div class="summary__main__pricing">
      <div class="summary__main__pricing__item">
        <div class="summary__main__pricing__item__label">Cost of goods</div>
        <div class="summary__main__pricing__item__value">{{ cost }}</div>
      </div>
      <div class="summary__main__pricing__item">
        <div class="summary__main__pricing__item__label">Dropshipping Free</div>
        <div class="summary__main__pricing__item__value">{{ dropshipping }}</div>
      </div>
      <div class="summary__main__pricing__item">
        <div class="summary__main__pricing__item__label"><b>GO-SEND</b> shipment</div>
        <div class="summary__main__pricing__item__value">{{ shipment }}</div>
      </div>
      <div class="summary__main__pricing__total">
        <div class="summary__main__pricing__total__label">Total</div>
        <div class="summary__main__pricing__total__value">{{ total }}</div>
      </div>
      <BaseButton>Continue to Payment</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/core/components/BaseButton.vue'

defineProps({
  itemsPurchased: {
    type: Number,
    required: true
  },
  deliveryEstimation: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  dropshipping: {
    type: String,
    required: true
  },
  shipment: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  }
})
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
        gap 22px

        &__total
          margin-top 10px
          font-size 14px
          color #666666

        &__divider
          border 1px solid #D8D8D8
          width 30%
          margin 10px 0

        &__item
          display flex
          flex-direction column
          gap 4px

          &__label
            font-size 14px
            color #000000

          &__value
            font-size 16px
            color #1BD97B
            font-weight 600

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
