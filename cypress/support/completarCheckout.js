Cypress.Commands.add('completarCheckout',(firstName, lastName, postalCode)=>{
   
    cy.checkout(firstName, lastName, postalCode)
    cy.url().should('include', '/checkout-step-two.html')
    cy.get('[data-test="finish"]').click()
    
})

Cypress.Commands.add('checkout',(firstName, lastName, postalCode)=>{
   
    // Iniciar checkout
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    // Completar formulario
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
    cy.get('[data-test="continue"]').click()
   
})