
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    })
  it('can type email', () => {
    cy.get('#email').type('cotyadams1@gmail.com');
  })
  it('can submit', () => {
    cy.get('#email').type("cotyadams1@gmail.com");
    cy.get('#submit').click();
    cy.get('#message').should('exist');
  })
  it('starts with 5th tile as active', () => {
    cy.get('.square').siblings('div:nth-of-type(5)').should("have.class", 'active')
  })
  it('can change active tile', () => {
    cy.get('#up').click();
    cy.get('.square').siblings('div:nth-of-type(2)').should("have.class", 'active')
  })
  it('coordinates and steps update', () => {
    cy.get('#coordinates').should('have.text', 'Coordinates (2, 2)')
    cy.get('#steps').should('have.text', 'You moved 0 times')
    cy.get('#up').click();
    cy.get('#coordinates').should('have.text', 'Coordinates (2, 1)')
    cy.get('#steps').should('have.text', 'You moved 1 time')
  })
  
})