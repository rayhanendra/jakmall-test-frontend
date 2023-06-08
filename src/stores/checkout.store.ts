import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore({
  id: 'checkout',
  state: () => ({
    activeStep: 1,
    dropshipper: false,
    checkout: {
      name: '',
      phoneNumber: '',
      address: '',
      dropshipperName: '',
      dropshipperPhoneNumber: '',

      shipment: {
        label: '',
        value: '',
        duration: ''
      },
      payment: {
        label: '',
        value: '',
        money: 0
      }
    } as Checkout
  }),
  actions: {
    setActiveStep(step: number) {
      this.activeStep = step
    },

    setDropshipper(dropshipper: boolean) {
      this.dropshipper = dropshipper
    },

    setCheckout(checkout: any) {
      this.checkout = checkout
    },

    setShipment(shipment: any) {
      this.checkout.shipment = shipment
    },

    setPayment(payment: any) {
      this.checkout.payment = payment
    }
  },
  persist: true
})
