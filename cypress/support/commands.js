Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
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


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
