/* eslint-disable cypress/no-unnecessary-waiting */
// https://on.cypress.io/api

// Note: Wait and reload is just to prove that the data is persisted
describe('Checkout', () => {
  it('Not a Dropshipper', () => {
    cy.visit('/')
    cy.get('button').contains('Checkout').click()

    // Delivery
    customer()
    cy.get('button[type="submit"]').click()
    backReloadGo()

    // Payment
    payment()
    backReloadGo()
    waitReloadWait()
    cy.get('button[type="submit"]').click()

    // Finish
    finish()
  })

  it('Is a Dropshipper', () => {
    cy.visit('/')
    cy.get('button').contains('Checkout').click()

    // Delivery
    customer()
    dropshipper()
    cy.get('button[type="submit"]').click()
    backReloadGo()

    // Payment
    payment()
    backReloadGo()
    waitReloadWait()
    cy.get('button[type="submit"]').click()

    // Finish
    finish()
  })

  const shipemnts = ['GO-SEND', 'JNE', 'Personal Courier']
  const payments = ['e-Wallet', 'Bank Transfer', 'Virtual Account']

  const customerData = {
    name: 'John Doe',
    phoneNumber: '1234567890',
    address:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.'
  }

  const dropshipperData = {
    name: 'Jane Doe',
    phoneNumber: '0987654321'
  }

  const customer = () => {
    cy.get('input[name="name"]').type(customerData.name)
    cy.get('input[name="phoneNumber"]').type(customerData.phoneNumber)
    cy.get('textarea[name="address"]').type(customerData.address)
  }

  const dropshipper = () => {
    cy.get('#dropshipper').click()
    cy.get('input[name="dropshipperName"]').parent().type(dropshipperData.name)
    cy.get('input[name="dropshipperPhoneNumber"]').parent().type(dropshipperData.phoneNumber)
  }

  const payment = () => {
    for (let i = 0; i < shipemnts.length; i++) {
      cy.contains(shipemnts[i]).click()
      cy.wait(250)
    }
    for (let i = 0; i < payments.length; i++) {
      cy.contains(payments[i]).click()
      cy.wait(250)
    }
  }

  const finish = () => {
    cy.wait(1000)
    cy.contains('Go to Homepage').click()
  }

  const backReloadGo = () => {
    cy.wait(500)
    cy.get('.back').click()
    cy.wait(500)
    cy.reload()
    cy.wait(500)

    cy.get('button[type="submit"]').click()
  }

  const waitReloadWait = () => {
    cy.wait(500)
    cy.reload()
    cy.wait(500)
  }
})
