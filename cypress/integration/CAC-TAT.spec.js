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
        .type('Reis da Luz', { delay: 0 })

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail.com', { delay: 0 })

        cy.get('textarea[id="open-text-area"]')
        .type('Olá estou mandando aqui uma mensagem pipipi popopo', { delay: 0 })

        cy.get('button[type="submit"]')
        .click()

        cy.get('.success')
        .should('be.visible')

    })
    it('verifica se ao enviar um formulário com email defeituoso retorna erro', function() {
        cy.get('input[id="firstName"]')
        .type('André')

        cy.get('input[id="lastName"]')
        .type('Reis da Luz', { delay: 0 })

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail,com', { delay: 0 })

        cy.get('textarea[id="open-text-area"]')
        .type('Olá estou mandando aqui uma mensagem pipipi popopo', { delay: 0 })

        cy.get('button[type="submit"]')
        .click()

        cy.get('.error').should('be.visible')
    })

    it('verifica se ao digitar texto na caixa de telefone, a caixa continua vazia', () => {
        cy.get('#phone').type('qweutoikjashdmnzxc', { delay: 0 }).should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
        cy.get('input[id="firstName"]')
        .type('André')

        cy.get('input[id="lastName"]')
        .type('Reis da Luz', { delay: 0 })

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail.com', { delay: 0 })

        cy.get('textarea[id="open-text-area"]')
        .type('Olá estou mandando aqui uma mensagem pipipi popopo', { delay: 0 })

        cy.get('#phone-checkbox').check()
        
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e verifica e depois limpa e verifica os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[id="firstName"]')
        .type('André').should('have.value', 'André')
        .clear().should('have.value', '')

        cy.get('input[id="lastName"]')
        .type('Reis da Luz', { delay: 0 }).should('have.value', 'Reis da Luz')
        .clear().should('have.value', '')

        cy.get('input[id="email"]')
        .type('andrereisdaluz@hotmail.com', { delay: 0 }).should('have.value', 'andrereisdaluz@hotmail.com')
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

    it('seleciona um produto (youtube) pelo seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (mentoria) pelo seu valor', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (blog) pelo seu indice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[value="feedback"]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').each((input) => {
            cy.wrap(input).check().should('be.checked') 
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked')
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should(($input) => {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.fixture('example.json', { encoding: null }).as('myFixture')
        cy.get('#file-upload').selectFile('@myFixture').should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing')
    })

})