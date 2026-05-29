describe('Login Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login exitoso', () => {
       
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include', '/inventory.html')
        cy.get('.app_logo').should('have.text', 'Swag Labs')
    })

    it('Login con contrasenia incorrecta', () => {
      
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauceaassd')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Login con campos vacíos', () => {

        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required')


    })

    it('Login con usurio bloqueado', () => {

        // login con usuario bloqueado
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface: Sorry, this user has been locked out')
    })

    it('Logout desde el menú hamburguesa', () => {

        // login con usuario correcto
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // click menu hamburguesa
        cy.get('[id="react-burger-menu-btn"]').click()

        // click logout
        cy.get('[data-test="logout-sidebar-link"]').click()

        // Valida que regrese a la página de login
        cy.url().should('include', 'https://www.saucedemo.com/') 

        // Valida que el botón de login vuelva a estar visible
        cy.get('[data-test="login-button"]').should('be.visible')

        // Valida que el contenedor del login está presente
        cy.get('.login_wrapper').should('exist')

    })


})