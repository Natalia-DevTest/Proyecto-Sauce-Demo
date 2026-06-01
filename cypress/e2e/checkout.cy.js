describe('Checkuot -  Sauce Demo', () => {
    beforeEach(() => {

        cy.login('standard_user', 'secret_sauce')

        cy.agregarAlCarrito('sauce-labs-backpack')

        // Se ingresa al carrito de compras
        cy.get('.shopping_cart_link').click()

    })

    it('Completar checkout con datos válidos', () => {

        cy.completarCheckout('Juan', 'Perez', '12345')

        // Valida que se muestre el mensaje 
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')


    })
    it('Checkout sin completar campos obligatorios', () => {
        //iniciando checkout
        cy.get('[data-test="checkout"]').click()
        //Valida que se redirija a la página de checkout step one
        cy.url().should('include', '/checkout-step-one.html')
        // Click en continuar sin completar campos
        cy.get('[data-test="continue"]').click()
        //Valida que se muestre el mensaje de error
        cy.get('[data-test="error"]').should('be.visible').and('have.text', 'Error: First Name is required')

    }) 
})       
