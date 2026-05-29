describe('Carrito - Sauce Demo', () => {

    beforeEach(() => {
        // se ingresa a Sauce Demo
        cy.visit('https://www.saucedemo.com/')
        // Logeo cn usuario correcto
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        // Se agrega la mochila al carrito
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        
    })

    it('Agregar un producto al carrito', () => {


        // Verifica que en el icono del carrito lleve el conteo 1
        cy.get('.shopping_cart_badge').should('have.text', '1')
        // verifica que ahora sea visible el boton remove
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')

    })

    it('Agregar multiples productos y verificar contador)', () => {

        it('Agregar productos al carrito', () => {

            // Se Buscan todos los botones de "Add to cart" 
            cy.get('button[id^="add-to-cart"]').as('productos').each(($el, index) => {
                // selecciona los primeros 2
                if (index < 2) {
                    cy.wrap($el).click()
                }
            })

            // Valida que el contador del carrito subió a 3
            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '3')

            // Se agrega un producto mas
            cy.get('@productos').eq(2).click()

            // Valida que el contador del carrito subió a 4
            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '4')
            })
        })    

    it('Eliminar un producto desde la página del carrito', () => {
        // Se agregan mas productos al carrito de compras 
        cy.get('button[id^="add-to-cart"]').as('productos').each(($el, index) => {
             // selecciona el primero
            if (index < 1) {
                cy.wrap($el).click()
            }
            })


        // Click en el carrito de compras
        cy.get('.shopping_cart_link').click()

        // Click en eliminar mochila
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()

        //Valida que el contador del carrito bajo a 1 
        cy.get('.shopping_cart_badge').should('have.text', '1')

        //Valida que el texto 'Sauce Labs Backpack' ya NO existe en la página
        cy.contains('Sauce Labs Backpack').should('not.exist')

    })

    it('Muestra el carrito vacio al eliminar todos los productos desde la pagina carrito', () => {
        // Se agregan mas productos al carrito de compras
        cy.get('button[id^="add-to-cart"]').as('productos').each(($el, index) => {
            // selecciona el primero
            if (index < 1) {
                cy.wrap($el).click()
            }
        })

        // Click en el carrito de compras
        cy.get('.shopping_cart_link').click()

        // Se eliminan todos los productos del carrito
        cy.get('button[id^="remove-sauce-labs"]').as('productos').each(($el, index) => {
            // selecciona el primero
            if (index < 2) {
                cy.wrap($el).click()
            }
        })

        //Valida que el contador ya no esta
        cy.get('.span.shopping_cart_badge').should('not.exist')

        //Valida que el texto 'Sauce Labs Backpack' ya NO existe en la página
        cy.contains('Sauce Labs Backpack').should('not.exist')

       

    })

})