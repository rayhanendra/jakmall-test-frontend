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
        duration: '',
        price: 0
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
    },

    reset() {
      this.activeStep = 1
      this.dropshipper = false
      this.checkout = {
        name: '',
        phoneNumber: '',
        address: '',
        dropshipperName: '',
        dropshipperPhoneNumber: '',
        shipment: {
          label: '',
          value: '',
          duration: '',
          price: 0
        },
        payment: {
          label: '',
          value: '',
          money: 0
        }
      }
    }
  },
  persist: true
})
