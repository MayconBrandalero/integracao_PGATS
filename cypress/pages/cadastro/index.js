import { faker } from '@faker-js/faker';

class Cadastro {
    realizarCadastroInicial(name, email){
 
        cy.get('[data-qa="signup-name"]').type(name);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.contains('button', 'Signup').click();
    };
    
    
    realizarCadastro(){

        const nome = faker.person.firstName('male');
        const sobrenome = faker.person.lastName('male');
        const nomeCompleto = nome + " " + sobrenome;
        Cypress.env("signUpName", nomeCompleto);
        Cypress.env("signUpEmail", faker.internet.email());
        Cypress.env("signUpAddress", faker.location.street())

        this.realizarCadastroInicial(Cypress.env("signUpName"), Cypress.env("signUpEmail"));

        cy.get('input[type=radio]').check('Mrs');
        cy.get('input[type=radio]').eq(1).check();
        cy.get('[type=password]').type(faker.string.alphanumeric(5));
        cy.get('[data-qa="days"]').select(String(faker.number.int({ min: 1, max: 28 })));
        cy.get('[data-qa="months"]').select(faker.date.month());
        cy.get('[data-qa="years"]').select(String(faker.number.int({ min: 1950, max: 2020 })));
        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();
        cy.get('[data-qa="first_name"]').type(nome);
        cy.get('[data-qa="last_name"]').type(sobrenome);
        cy.get('[data-qa="company"]').type(faker.company.name());
        cy.get('[data-qa="address"]').type(Cypress.env("signUpAddress"));
        cy.get('[data-qa="country"]').select("Canada");
        cy.get('[data-qa="state"]').type("Ontario");
        cy.get('[data-qa="city"]').type("Ottawa");
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode('######'));
        cy.get('[data-qa="mobile_number"]').type(faker.string.numeric("+1 #### ####"));
        cy.get('[data-qa="create-account"]').click();

        cy.url().should('includes', 'account_created');
        cy.get('[data-qa="account-created"]').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();

    };
}

export default new Cadastro();