/// <reference types="cypress"/>

import faker from 'faker-br'
faker.locale = 'en_GB'

let firstName = faker.name.firstName()
let lastName = faker.name.lastName()
let name = `${firstName} ${lastName}`
let email = faker.internet.email(firstName)
let password = faker.internet.password()
let company = faker.company.companyName()
let address = faker.address.streetAddress()
let address2 = faker.address.secondaryAddress()
let country = 'United States'
let state = faker.address.state()
let city = faker.address.city()
let zipcode = faker.address.zipCode()
let mobile_number = faker.phone.phoneNumber()

let user ={
  email:'jhonatans@gmail.com',
  password:'58745308',
  fullName:'JHONATAN SIMOURA DE SOUZA',
  incorrectEmail:'mario@gmail.com',
  incorrectPassoword:'1234',
}
describe('Automation Exercises', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
  it('Test Case 1: Register User', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a[href="/login"]').click()
    cy.get('h2').contains('New User Signup!').should('be.visible')
    cy.get('input[data-qa="signup-name"]').type(name, { delay: 0 })
    cy.get('input[data-qa="signup-email"]').type(email, { delay: 0 })
    cy.get('button[data-qa="signup-button"]').click()
    cy.get('b').contains('Enter Account Information').should('be.visible')
    cy.get('#id_gender1').click()
    cy.get('[data-qa="password"]').type(password)
    cy.get('[data-qa="days"]').select(3)
    cy.get('[data-qa="months"]').select('June')
    cy.get('[data-qa="years"]').select('1992')
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type(firstName)
    cy.get('[data-qa="last_name"]').type(lastName)
    cy.get('[data-qa="company"]').type(company)
    cy.get('[data-qa="address"]').type(address, { delay: 0 })
    cy.get('[data-qa="address2"]').type(address2, { delay: 0 })
    cy.get('[data-qa="country"]').select(country, { delay: 0 })
    cy.get('[data-qa="state"]').type(state)
    cy.get('[data-qa="city"]').type(city)
    cy.get('[data-qa="zipcode"]').type(zipcode)
    cy.get('[data-qa="mobile_number"]').type(mobile_number)
    cy.get('[data-qa="create-account"]').click()
    cy.get('h2[data-qa="account-created"]').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.get('a').contains('Logged').should('be.visible')
    cy.get('a[href="/delete_account"]').click()
    cy.get('h2[data-qa="account-deleted"]').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  })
  it('test case 2: Usuário de login com e-mail e senha corretos', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a[href="/login"]').click()
    cy.get('h2').contains('Login to your account').should('be.visible')
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)
    cy.get('button[data-qa="login-button"]').click()
    cy.get('b').contains(user.fullName).should('be.visible')
    cy.get('a').contains(' Logout').click()
    cy.url().should('include','/login')
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a[href="/login"]').click()
    cy.get('h2').contains('Login to your account').should('be.visible')
    cy.get('[data-qa="login-email"]').type(user.incorrectEmail)
    cy.get('[data-qa="login-password"]').type(user.incorrectPassoword)
    cy.get('button[data-qa="login-button"]').click()
    cy.get('p').contains('Your email or password is incorrect!').should('be.visible')
  })

  it('test case 4: Sair do Usuário', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="login-email"]').type(user.email)
    cy.get('[data-qa="login-password"]').type(user.password)
    cy.get('button[data-qa="login-button"]').click()
    cy.get('b').contains(user.fullName).should('be.visible')
    cy.get('a').contains(' Logout').click()
    cy.url().should('include','/login')
  })
  it('test case 5:Registrar usuário com e-mail existente!', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a[href="/login"]').click()
    cy.get('h2').contains('New User Signup!').should('be.visible')
    cy.get('input[data-qa="signup-name"]').type(firstName)
    cy.get('input[data-qa="signup-email"]').type(user.email)
    cy.get('button[data-qa="signup-button"]').click()
    cy.get('p').contains('Email Address already exist!').should('be.visible')
  })
  it('test case 6: Formulário de contato', () => {

    const longText = Cypress._.repeat('Obrigado por tudo', 6)
    cy.get('a > img').should('be.visible')
    cy.get('a[href="/contact_us"]').click()
    cy.get('h2').contains('Get In Touch').should('be.visible')
    cy.get('[data-qa="name"]').type(firstName)
    cy.get('[data-qa="email"]').type(user.email)
    cy.get('[data-qa="subject"]').type('moda')
    cy.get('[data-qa="message"]').type(longText)
    cy.get('input[type="file"]')
    .should('not.have.value')
  })
  it('test case  7: verificar a página de casos de teste', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a').contains("Test Cases").click()
    cy.get('b').contains('Test Cases').should('be.visible')

  })
  it('test case 8: verificar todos os produtos e a página de detalhes do produto', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a').contains('Products').click()
    cy.get('#sale_image').should('be.visible')
    cy.get('#search_product').should('be.visible')
    cy.get('a').contains("View Product").click()
    cy.get('b').contains('Availability').should('be.visible')
    cy.get('b').contains('Condition').should('be.visible')
    cy.get('b').contains('Brand').should('be.visible')
    cy.get('h2').contains('Blue Top').should('be.visible')
    cy.get('p').contains('Category: Women ').should('be.visible')

  })
  it.only('test case 9: produto de pesquisa', () => {
    cy.get('a > img').should('be.visible')
    cy.get('a').contains('Products').click()
    cy.get('#sale_image').should('be.visible')
    cy.get('#search_product').type('Blue Top')
    cy.get('#submit_search').click()
    cy.get('.productinfo > img').should('be.visible')

  })
})
