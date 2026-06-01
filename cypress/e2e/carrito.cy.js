describe('Carrito - Sauce Demo', () => {

    beforeEach(() => {
        cy.login('standard_user', 'secret_sauce')
        cy.agregarAlCarrito('sauce-labs-backpack')
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')

    })

    it('Agregar multiples productos y verificar contador)', () => {

        cy.agregarCantidadValidaDeProductosAlCarrito(2)
        cy.verificarContadorDelCarrito(3)
        cy.agregarCantidadValidaDeProductosAlCarrito(1)
        cy.verificarContadorDelCarrito(4)

    })


    it('Eliminar un producto desde la página del carrito', () => {
        // Click en el carrito de compras
        cy.get('.shopping_cart_link').click()

        // Click en eliminar mochila
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()

        //Valida que el contador del carrito no existe 
        cy.get('.shopping_cart_badge').should('not.exist')

        //Valida que el texto 'Sauce Labs Backpack' ya NO existe en la página
        cy.contains('Sauce Labs Backpack').should('not.exist')

    })

})