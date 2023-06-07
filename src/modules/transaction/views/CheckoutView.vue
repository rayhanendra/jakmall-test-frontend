<template>
  <div class="background">
    <div class="container">
      <div class="card">
        <CheckoutStepper :steps="steps" :active-step="activeStep" />
        <Form :validation-schema="validationSchema" @submit="onSubmit">
          <div class="card__content">
            <div class="card__form">
              <CheckoutDelivery @update:dropshipper="handleDropshipper" />
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
import { reactive, ref } from 'vue'
import CheckoutStepper from '../components/CheckoutStepper.vue'
import { Form } from 'vee-validate'
import * as Yup from 'yup'
import CheckoutDelivery from '../components/CheckoutDelivery.vue'
import CheckoutSummary from '../components/CheckoutSummary.vue'

const steps = ['Delivery', 'Payment', 'Finish']
const activeStep = ref(1)
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

const handleDropshipper = (value: boolean) => {
  dropshipper.value = value
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string()
    .min(6, 'Phone number must be at least 6 characters')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  dropshipperName: Yup.string().when(() => {
    if (dropshipper.value) {
      return Yup.string().required('Dropshipper name is required')
    }
  }),
  dropshipperPhoneNumber: Yup.string().when(() => {
    if (dropshipper.value) {
      return Yup.string()
        .min(6, 'Phone number must be at least 6 characters')
        .required('Phone number is required')
    }
  })
})

const onSubmit = async (value: any) => {
  handleNext()

  const data = {
    name: value.name,
    phoneNumber: value.phoneNumber,
    address: value.address,
    dropshipperName: dropshipper.value ? value.dropshipperName : '',
    dropshipperPhoneNumber: dropshipper.value ? value.dropshipperPhoneNumber : ''
  }

  if (activeStep.value === steps.length) {
    console.log('submit', data)

    return
  }
}

const handleNext = () => {
  activeStep.value += 1

  if (activeStep.value > 3) {
    activeStep.value = 1
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
