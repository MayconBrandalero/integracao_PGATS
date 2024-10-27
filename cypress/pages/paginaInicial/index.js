class PaginaInicial{
    enviarSubscricao(email){
        cy.get('h2')
        .contains('Subscription')
        .should('be.visible')
        .scrollIntoView();

        cy.get('[id="susbscribe_email"]').type(email);
        cy.get('button#subscribe').click();
    };
};

export default new PaginaInicial;