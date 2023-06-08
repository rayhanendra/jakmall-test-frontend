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
            <div class="card__back" @click="handleBack">
              {{ backLabel[activeStep] }}
            </div>
            <div class="card__form">  
              <!-- Note: The activeStep is based on the persisted state from store -->
              <CheckoutDelivery v-if="activeStep === 1" @update:dropshipper="handleDropshipper" />
              <CheckoutPayment v-if="activeStep === 2" />
            </div>
            <div class="card__summary">
              <CheckoutSummary
                :items-purchased="summary.itemsPurchased"
                :delivery-estimation="summary.deliveryEstimation"
                :payment-method="summary.paymentMethod"
                :cost="summary.cost"
                :dropshipping="summary.dropshipping"
                :shipment="summary.shipment"
                :total="summary.total"
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import CheckoutStepper from '../components/CheckoutStepper.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import CheckoutDelivery from '../components/CheckoutDelivery.vue'
import CheckoutSummary from '../components/CheckoutSummary.vue'
import CheckoutPayment from '../components/CheckoutPayment.vue'
import { useCheckoutStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const checkoutStore = useCheckoutStore()
const { checkout, activeStep } = storeToRefs(checkoutStore)

const backLabel: {
  [key: number]: string
} = {
  1: 'Back to Cart',
  2: 'Back to Delivery',
  3: 'Back to Payment'
}
const steps = ['Delivery', 'Payment', 'Finish']
const dropshipper = ref(false)

const summary = reactive({
  itemsPurchased: 10,
  deliveryEstimation: '1-2 days',
  paymentMethod: 'Bank Transfer',
  cost: 'Rp500.000',
  dropshipping: 'Rp5.900',
  shipment: 'Rp15.000',
  total: 'Rp505.900'
})

// Note: Initialize the form values based on the persisted state from store
const initialValues = reactive<Checkout>({
  name: checkout.value.name,
  phoneNumber: checkout.value.phoneNumber,
  address: checkout.value.address,
  dropshipperName: checkout.value.dropshipperName,
  dropshipperPhoneNumber: checkout.value.dropshipperPhoneNumber,
  shipment: '',
  payment: ''
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

// Note: Every time the activeStep changes, it will trigger the watch function, and then it will push the query to the router
watch(
  activeStep,
  () => {
    router.push({ query: { step: steps[activeStep.value - 1] } })
  },
  {
    immediate: true
  }
)

const onSubmit = async (value: any) => {
  checkoutStore.setCheckout({
    name: value.name,
    phoneNumber: value.phoneNumber,
    address: value.address,
    dropshipperName: dropshipper.value ? value.dropshipperName : '',
    dropshipperPhoneNumber: dropshipper.value ? value.dropshipperPhoneNumber : ''
  })

  handleNext()

  const data: Checkout = {
    name: value.name,
    phoneNumber: value.phoneNumber,
    address: value.address,
    dropshipperName: dropshipper.value ? value.dropshipperName : '',
    dropshipperPhoneNumber: dropshipper.value ? value.dropshipperPhoneNumber : '',
    shipment: '',
    payment: ''
  }

  if (activeStep.value === steps.length) {
    console.log('submit', data)

    return
  }
}

const handleDropshipper = (value: boolean) => {
  dropshipper.value = value
}

const handleBack = () => {
  activeStep.value -= 1
  checkoutStore.setActiveStep(activeStep.value)

  if (activeStep.value < 1) {
    activeStep.value = 1
    checkoutStore.setActiveStep(activeStep.value)
  }
}

const handleNext = () => {
  activeStep.value += 1
  checkoutStore.setActiveStep(activeStep.value)

  if (activeStep.value > 3) {
    activeStep.value = 1
    checkoutStore.setActiveStep(activeStep.value)
  }
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

  &__back
    position absolute
    margin-left 40px
    color #FF8A00
    font-size 14px
    font-weight 500
    cursor pointer

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
