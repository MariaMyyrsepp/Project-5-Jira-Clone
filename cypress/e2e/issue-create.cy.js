import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  //Test Case 1. Custom Issue Creation

  it('Maria Myyrsepp issue creation and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      //Modify the test case
      //Title "BUG"
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]')
          .trigger('click');
            
      //Description "My bug description"
      cy.get('.ql-editor').type('Maria bug description');

      //Issue type: "BUG"
      cy.get('input[name="title"]').type('Maria BUG');
      
      //Priority "Highest"
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]')

      //Select "Pickle Rick" as reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="avatar:Pickle Rick"]').click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Maria BUG');

      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });


//Test Case 2. Random Data Plugin Issue Creation
const randomText = faker.lorem.word()

  it('Maria Myyrsepp - Random data Plugin Issue creation', () => {
  //System finds modal for creating issue and does next steps inside of it
  cy.get('[data-testid="modal:issue-create"]').within(() => {

  //Insert value for the Description
  cy.get('.ql-editor').type(faker.lorem.words(3))
  .trigger('click');

  //Insert value for Title field
  cy.get('[data-testid="form-field:title"]').type(randomText)
    
  //Issue type: Task
  cy.get('[data-testid="select:type"]').click();
  cy.get('[data-testid="icon:task"]')
  .trigger('click');

  //Select "Baby Yoda" as reporter dropdown
  cy.get('[data-testid="select:reporterId"]').click();
  cy.get('[data-testid="select-option:Baby Yoda"]').click();

  //Selet "Baby Yoda" as assignee, otherwise I am not able to run code for validation
  cy.get('[data-testid="select:userIds"]').click();
  cy.get('[data-testid="select-option:Baby Yoda"]').click();
   
  //Priority "Low"
  cy.get('[data-testid="select:priority"]').click();
  cy.get('[data-testid="select-option:Low"]')
  .trigger('click');
  
  //Click on button "Create issue"
  cy.get('button[type="submit"]').click();
  });

  //Assert that modal window is closed and successful message is visible
  cy.get('[data-testid="modal:issue-create"]').should('not.exist');
  cy.contains('Issue has been successfully created.').should('be.visible');

  //Reload the page to be able to see recently created issue
  //Assert that successful message has dissappeared after the reload
  cy.reload();
  cy.contains('Issue has been successfully created.').should('not.exist');

  //Assert than only one list with name Backlog is visible and do steps inside of it
  cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {

  //Assert that this list contains 5 issues and first element with tag p has specified text
  cy.get('[data-testid="list-issue"]')
  .should('have.length', '5')
  .first()
  .find('p')
  .contains(randomText);

// Assert that reporter avatar is visible 
  //Assert that correct avatar and type icon are visible
  cy.get('[data-testid="avatar:Baby Yoda"]').should('be.visible');
  cy.get('[data-testid="icon:story"]').should('be.visible');

});
});
});
