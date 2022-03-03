it('Simple Recipe', () => {
  cy.visit('/');

  cy.findByLabelText('Quantity').type('{backspace}4');
  cy.findByLabelText('Weightg').type('{leftArrow}{backspace}6');

  cy.findByLabelText('Flourg').should('have.value', '552');
  cy.findByLabelText('Waterg').should('have.value', '295');
  cy.findByLabelText('Starterg').should('have.value', '182');
  cy.findByLabelText('Saltg').should('have.value', '11');
});
