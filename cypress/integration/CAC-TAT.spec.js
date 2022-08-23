// CAC-TAT.spec.js created with Cypress

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id="firstName"]')
        .type('André')

        cy.get('input[id="lastName"]')
        .type('Reis da Luz')

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail.com')

        cy.get('textarea[id="open-text-area"]')
        .type('Olá estou mandando aqui uma mensagem pipipi popopo')

        cy.get('button[type="submit"]')
        .click()

        cy.get('.success')
        .should('be.visible')

    })
    it('verifica se ao enviar um formulário com email defeituoso retorna erro', function() {
        cy.get('input[id="firstName"]')
        .type('André')

        cy.get('input[id="lastName"]')
        .type('Reis da Luz')

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail,com')

        cy.get('textarea[id="open-text-area"]')
        .type('Olá estou mandando aqui uma mensagem pipipi popopo')

        cy.get('button[type="submit"]')
        .click()

        cy.get('.error').should('be.visible')
    })

    it('verifica se ao digitar texto na caixa de telefone, a caixa continua vazia', () => {
        cy.get('#phone').type('qweutoikjashdmnzxc').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
        cy.get('input[id="firstName"]')
        .type('André')

        cy.get('input[id="lastName"]')
        .type('Reis da Luz')

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail.com')

        cy.get('textarea[id="open-text-area"]')
        .type('Olá estou mandando aqui uma mensagem pipipi popopo')

        cy.get('#phone-checkbox').click()
        
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e verifica e depois limpa e verifica os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[id="firstName"]')
        .type('André').should('have.value', 'André')
        .clear().should('have.value', '')

        cy.get('input[id="lastName"]')
        .type('Reis da Luz').should('have.value', 'Reis da Luz')
        .clear().should('have.value', '')

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail.com').should('have.value', 'andrereisdaluz@hotmail.com')
        .clear().should('have.value', '')

        cy.get('#phone').type('364723').should('have.value', '364723')
        .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })
})