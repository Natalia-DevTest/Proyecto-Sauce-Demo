describe('Login Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login exitoso', () => {
       
        cy.login('standard_user', 'secret_sauce')
        cy.url().should('include', '/inventory.html')
        cy.get('.app_logo').should('have.text', 'Swag Labs')
    })

    it('Login con contrasenia incorrecta', () => {
       cy.login('standard_user', 'secret_sauceaassd')
       cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match any user in this service')
    
    })

    it('Login con campos vacíos', () => {

        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required')


    })

    it('Login con usurio bloqueado', () => {
        cy.login('locked_out_user', 'secret_sauce')

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Epic sadface: Sorry, this user has been locked out')
    })

    it('Logout desde el menú hamburguesa', () => {

        cy.login('standard_user', 'secret_sauce')
        cy.logout()
        cy.url().should('include', 'https://www.saucedemo.com/')
        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')
       
    })


})