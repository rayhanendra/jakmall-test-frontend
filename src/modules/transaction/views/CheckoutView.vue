<template>
  <div class="background">
    <div class="container">
      <div class="card">
        <CheckoutStepper :steps="steps" :active-step="activeStep" />
        <Form
          :initial-values="initialValues"
          :validation-schema="validationSchema"
          @submit="onSubmit"
        >
          <div class="card__content">
            <CheckoutBack :active-step="activeStep" @click="handleBack" />
            <div class="card__form">
              <router-view />
            </div>
            <div class="card__summary">
              <CheckoutSummary />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import CheckoutStepper from '../components/CheckoutStepper.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import CheckoutSummary from '../components/CheckoutSummary.vue'
import { useCheckoutStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import CheckoutBack from '../components/CheckoutBack.vue'

const router = useRouter()

const checkoutStore = useCheckoutStore()
const { checkout, activeStep, dropshipper } = storeToRefs(checkoutStore)

const steps = ['Delivery', 'Payment', 'Finish']

// Note: Initialize the form values based on the persisted state from store
const initialValues = reactive({
  name: checkout.value.name,
  phoneNumber: checkout.value.phoneNumber,
  address: checkout.value.address,
  dropshipperName: checkout.value.dropshipperName,
  dropshipperPhoneNumber: checkout.value.dropshipperPhoneNumber
})

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .min(6, 'Phone number must be at least 6 characters')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  // Note: The following error is from Yup, but it's not a problem. Forgive me please :(
  dropshipperName: Yup.string().when(() => {
    if (dropshipper.value) {
      return Yup.string().required('Dropshipper name is required')
    }
  }),
  // Note: The following error is from Yup, but it's not a problem. Forgive me please :(
  dropshipperPhoneNumber: Yup.string().when(() => {
    if (dropshipper.value) {
      return Yup.string()
        .min(6, 'Phone number must be at least 6 characters')
        .required('Phone number is required')
    }
  })
})

const onSubmit = async (value: any) => {
  // Note: Set the checkout state to the store
  checkoutStore.setCheckout({
    ...checkout.value,
    name: value.name,
    phoneNumber: value.phoneNumber,
    address: value.address,
    dropshipperName: dropshipper.value ? value.dropshipperName : '',
    dropshipperPhoneNumber: dropshipper.value ? value.dropshipperPhoneNumber : ''
  })

  handleNext()

  const data = {
    name: value.name,
    phoneNumber: value.phoneNumber,
    address: value.address,
    dropshipperName: dropshipper.value ? value.dropshipperName : '',
    dropshipperPhoneNumber: dropshipper.value ? value.dropshipperPhoneNumber : ''

    // TODO: add shipment and payment data
  }

  if (activeStep.value === steps.length) {
    console.log('submit', data)

    return
  }
}

const handleBack = () => {
  if (activeStep.value === 1) {
    return
  }

  activeStep.value -= 1

  router.push({
    name: steps[activeStep.value - 1]
  })
}

const handleNext = () => {
  if (activeStep.value === steps.length) {
    return
  }

  activeStep.value += 1

  router.push({
    name: steps[activeStep.value - 1]
  })
}
</script>

<style scoped lang="stylus">
.background
  background-color #FFFAE6
  height 100vh

.container
  margin 0 auto
  padding 54px 0
  width 100%
  max-width 1100px
  height 100%
  max-height 550px

.card
  background-color #FFFFFF
  box-shadow 2px 10px 20px rgba(255, 138, 0, 0.1);
  border-radius 4px;

  &__content
    display flex
    flex-basis 100%

  &__form
    flex-basis 70%
    padding 40px
    flex-direction column
    height 100%

  &__summary
    flex-basis 30%
    height 480px
    padding 0px 20px
    padding-top 40px
    padding-bottom 20px
    border-left 1px solid #FF8A00
    display flex
    flex-direction column
</style>
