class Produtos {
  visualizarPrimeiroProduto() {
    cy.get('[data-product-id]').should('have.length.at.least', 1);
    cy.get('[href="/product_details/1"]').click();
  }

  checarInformacoesDoProduto() {
    cy.get('.product-information > h2').should('be.visible');
    cy.get('.product-information > p')
      .contains('p', 'Category')
      .should('be.visible');
    cy.get('.product-information > p')
      .contains('p', 'Availability')
      .should('be.visible');
    cy.get('.product-information > p')
      .contains('p', 'Condition')
      .should('be.visible');
    cy.get('.product-information > p')
      .contains('p', 'Brand')
      .should('be.visible');
    cy.get('.product-information > span')
      .contains('span', 'Rs')
      .should('be.visible');
  }

  adicionarProdutoAoCarrinho() {
    cy.get('[class="btn btn-default cart"]').click();
    cy.get('[class="modal-title w-100"]')
      .contains('Added!')
      .should('be.visible');
  }
}

export default new Produtos();
