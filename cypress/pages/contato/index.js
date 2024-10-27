import { faker } from '@faker-js/faker';

class Contato {
  preencherContato() {
    cy.get('[data-qa="name"]').type(faker.person.fullName());
    cy.get('[data-qa="email"]').type(faker.internet.email());
    cy.get('[data-qa="subject"]').type(faker.lorem.words(3));
    cy.get('[data-qa="message"]').type(faker.lorem.paragraphs(2));
    cy.fixture('arquivo.txt').as('arquivo');
    cy.get('input[name="upload_file"]').selectFile('@arquivo');
    cy.get('[data-qa="submit-button"]').click();

    cy.get('[class="status alert alert-success"]')
      .should('be.visible')
      .should(
        'have.text',
        'Success! Your details have been submitted successfully.'
      );
  }
}

export default new Contato();
