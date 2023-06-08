import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore({
  id: 'checkout',
  state: () => ({
    activeStep: 1,
    checkout: {
      name: '',
      phoneNumber: '',
      address: '',
      dropshipperName: '',
      dropshipperPhoneNumber: '',

      shipment: '',
      payment: ''
    } as Checkout
  }),
  actions: {
    setActiveStep(step: number) {
      this.activeStep = step
    },

    setCheckout(checkout: any) {
      this.checkout = checkout
    }
  },
  persist: true
})
