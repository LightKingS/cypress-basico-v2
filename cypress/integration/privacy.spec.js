describe('Central de Privacidade do Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })

    it('testa a página da política de privavidade de forma independente', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})