it('Simple Formula', () => {
  cy.visit('/');

  cy.findByLabelText('Quantity').type('{backspace}4');
  cy.findByLabelText('Weightg').type('{leftArrow}{backspace}6');

  cy.findByLabelText('Flourg').should('have.value', '552');
  cy.findByLabelText('Waterg').should('have.value', '295');
  cy.findByLabelText('Starterg').should('have.value', '182');
  cy.findByLabelText('Saltg').should('have.value', '11');
});

it('Advanced Formula', () => {
  cy.visit('/');

  cy.findAllByLabelText('Label').eq(0).type('1');
  cy.findByLabelText('Flour1 Percent').type(
    '{leftArrow}{backspace}{backspace}9'
  );

  cy.findByRole('button', { name: 'Add a flour' }).click();
  cy.findAllByLabelText('Label').eq(1).type('2');

  cy.findByRole('button', { name: 'Add an adjunct' }).click();

  cy.findByLabelText('Flour1g').should('have.value', '227');
  cy.findByLabelText('Flour2g').should('have.value', '25');
  cy.findByLabelText('Saltg').should('have.value', '5');
  cy.findByLabelText('Adjunctg').should('have.value', '25');
  cy.findByLabelText('Waterg').should('have.value', '135');
  cy.findByLabelText('Starterg').should('have.value', '83');
});
