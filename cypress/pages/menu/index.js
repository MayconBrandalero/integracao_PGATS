class Menu {
  acessarTelaLogin() {
    cy.contains('Signup').click();
    cy.url().should('contain', 'login');
    cy.contains('Login to your account').should('be.visible');
  }

  acessarTelaCadastro() {
    cy.contains('Signup').click();
    cy.url().should('contain', 'login');
    cy.contains('Login to your account').should('be.visible');
  }

  realizarLogout() {
    cy.get('[href="/logout"]').click();
    cy.url().should('contain', 'login');
    cy.contains('Login to your account').should('be.visible');
  }

  acessarTelaContato() {
    cy.contains(`Contact us`).click();
    cy.get('[id="contact-us-form"]').should('be.visible');
  }

  acessarTelaProdutos() {
    cy.contains(`Products`).click();
    cy.get('[class="title text-center"]').should('contain', 'All Products');
  }

  acessarCarrinho() {
    cy.contains('a', 'Cart').click();
    cy.get('[class="active"]').should('be.visible').contains('Shopping Cart');
  }

  deletarConta() {
    cy.get('[href="/delete_account"]').click();
    cy.get('[class="title text-center"]')
      .contains('Account Deleted!')
      .should('be.visible');
  }
}

export default new Menu();
