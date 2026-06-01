describe('Inventario - Sauce Demo', () => {

    beforeEach(()=>{
      cy.login('standard_user', 'secret_sauce')

    })

    it('Verificar cantidad de productos', () => {
        cy.get('[data-test="inventory-item-name"]').should('have.length',6)
    })

    it('Ordenar productos por precio (menor a mayor)',()=>{
        cy.get('[data-test="product-sort-container"]').select('lohi')

        cy.get('[data-test="product-sort-container"]').should('have.value','lohi')

        cy.get('.inventory_item_name').eq(0).should('have.text','Sauce Labs Onesie')
        cy.get('.inventory_item_price').first().should('have.text','$7.99')
        
    })

})