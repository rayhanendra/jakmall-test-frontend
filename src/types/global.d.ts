interface Checkout {
  name: string
  phoneNumber: string
  address: string
  dropshipperName: string
  dropshipperPhoneNumber: string
  shipment: {
    label: string
    value: string
    duration: string
    price: number
  }
  payment: {
    label: string
    value: string
    money?: number
  }
}
