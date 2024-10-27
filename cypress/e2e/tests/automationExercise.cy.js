/// <reference types = "cypress" />;
import cadastro from '../../pages/cadastro/index';
import login from '../../pages/login/index';
import menu from '../../pages/menu';
import contato from '../../pages/contato';
import paginaInicial from '../../pages/paginaInicial';
import produtos from '../../pages/produtos';
import carrinho from '../../pages/carrinho';

describe('Conjunto de testes da ferramenta Automation Exercise', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('CT1: Registrar um novo usuário', () => {
    menu.acessarTelaCadastro();
    cadastro.realizarCadastro();
    cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'));
  });

  it('CT2: Login com um usuário com email e senha corretos', () => {
    menu.acessarTelaLogin();
    login.realizarLogin('tester@cypress.pgats', '12345');
    cy.get('i.fa-user').parent().should('contain', 'tester Cypress');
  });

  it('CT3: Login com um usuário com email e senha incorretos', () => {
    menu.acessarTelaLogin();
    login.realizarLogin('tester.incorrect@cypress.pgats', '123');
    cy.get('p').should('contain', 'Your email or password is incorrect!');
  });

  it('CT4: Logout de um usuário', () => {
    menu.acessarTelaLogin();
    login.realizarLogin('tester@cypress.pgats', '12345');
    cy.get('i.fa-user').parent().should('contain', 'tester Cypress');

    menu.realizarLogout();
  });

  it('CT5: Registro de um usuário usando um email já existente', () => {
    menu.acessarTelaCadastro();
    cadastro.realizarCadastroInicial('Nome', 'tester@cypress.pgats');
    cy.get(`.signup-form > form > p`)
      .should('be.visible')
      .and('contain', 'Email Address already exist!');
  });

  it('CT6: Enviar um formulario de contato', () => {
    menu.acessarTelaContato();
    contato.preencherContato();
  });

  it('CT8: Verificar todos os produtos e página de detalhes de produtos', () => {
    menu.acessarTelaProdutos();
    produtos.visualizarPrimeiroProduto();
    produtos.checarInformacoesDoProduto();
  });

  it('CT9: Testar busca de produtos', () => {
    menu.acessarTelaProdutos();

    cy.get('input#search_product').type('Shirt');
    cy.get('button#submit_search').click();

    cy.get('[data-product-id]').should('have.length.at.least', 1);
  });

  it('CT10: Verificar subscrição na página inicial', () => {
    paginaInicial.enviarSubscricao('teste@sub.com');
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('CT15: Verificar cadastro antes do pagamento', () => {
    menu.acessarTelaCadastro();
    cadastro.realizarCadastro();
    menu.acessarTelaProdutos();
    produtos.visualizarPrimeiroProduto();
    produtos.adicionarProdutoAoCarrinho();
    cy.get('[class="btn btn-success close-modal btn-block"]').click();
    menu.acessarCarrinho();
    carrinho.realizarCheckout();
    carrinho.checarEndereco(
      Cypress.env('signUpName'),
      Cypress.env('signUpAddress')
    );
    carrinho.checarPedido();
    carrinho.comentarERealizarPedido('teste');
    carrinho.preencherPagamento(Cypress.env('signUpName')); //Nao esta achando a msg de sucesso
    menu.deletarConta();
    cy.get('[data-qa="continue-button"]').click();
    cy.url().should('eq', 'https://automationexercise.com/');
  });
});
