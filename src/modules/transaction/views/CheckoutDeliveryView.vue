<template>
  <div>
    <div class="delivery__title">
      <CheckoutTitle title="Delivery details" />
      <div class="input">
        <input v-model="dropshipper" type="checkbox" id="dropshipper" />
        <label for="dropshipper">Send as Dropshipper</label>
      </div>
    </div>
    <div class="form">
      <div class="form__main">
        <BaseTextField type="text" name="name" label="Name" :value="checkout.name" />
        <BaseTextField
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          :value="checkout.phoneNumber"
        />
        <BaseTextArea name="address" label="Delivery Address" :value="checkout.address" />
      </div>
      <div class="form__dropshipper">
        <BaseTextField
          type="text"
          name="dropshipperName"
          label="Dropshipper Name"
          :value="checkout.dropshipperName"
          :disabled="!dropshipper"
        />
        <BaseTextField
          type="tel"
          name="dropshipperPhoneNumber"
          label="Dropshipper Phone Number"
          :value="checkout.dropshipperPhoneNumber"
          :disabled="!dropshipper"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckoutTitle from '@/modules/transaction/components/CheckoutTitle.vue'
import BaseTextField from '@/core/components/BaseTextField.vue'
import BaseTextArea from '@/core/components/BaseTextArea.vue'
import { watch } from 'vue'
import { useCheckoutStore } from '@/stores'
import { storeToRefs } from 'pinia'

const checkoutStore = useCheckoutStore()
const { checkout, dropshipper } = storeToRefs(checkoutStore)

watch(dropshipper, (value) => {
  checkoutStore.setDropshipper(value)
})
</script>

<style scoped lang="stylus">

.delivery
  &__title
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    gap 20px

    @media screen and (max-width: 768px)
      flex-direction column
      align-items flex-start
      gap 10px
      margin-bottom 40px

.input
  display flex
  flex-direction row
  align-items center
  gap 10px

  label
    font-family 'Inter UI'
    font-size 14px
    font-weight 500
    color #000000

.form
  display flex
  flex-direction row
  gap 20px

  @media screen and (max-width: 768px)
    flex-direction column

  &__main
    width 100%
    display flex
    flex-direction column
    gap 20px

  &__dropshipper
    width 100%
    display flex
    flex-direction column
    gap 20px
</style>
