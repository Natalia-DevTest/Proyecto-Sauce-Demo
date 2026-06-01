
Cypress.Commands.add('login',(user, pass)=>{
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type(user)
    cy.get('[data-test="password"]').type(pass)
    cy.get('[data-test="login-button"]').click()
})

Cypress.Commands.add('agregarAlCarrito',(producto)=>{
    cy.get(`[data-test="add-to-cart-${producto}"]`).click()
})

Cypress.Commands.add('irAlCarrito',()=>{
    cy.get('.shopping_cart_link').click()
    cy.url().should('include', '/cart.html')
})

Cypress.Commands.add('confirmarPedido',()=>{
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
})

Cypress.Commands.add('agregarCantidadValidaDeProductosAlCarrito', (cantidad) => {
  // Buscamos Todos los botones de agregar
  cy.get('button[id^="add-to-cart"]')
    // Validamos que existan y que haya suficientes
    .should('exist')
    .and('have.length.at.least', cantidad)
    // Se agregan al carrito la cantidad especificada de productos
    .each((boton, index) => {
      if (index < cantidad) {
        cy.wrap(boton).click()
      }
    })
})
Cypress.Commands.add('verificarContadorDelCarrito', (cantidadEsperada) => {
  cy.get('.shopping_cart_badge')
    .should('be.visible')
    .and('have.text', String(cantidadEsperada)); 
});

Cypress.Commands.add('logout',()=>{
    cy.get('[id="react-burger-menu-btn"]').click() 
    cy.get('[id="logout_sidebar_link"]').click()
    
})