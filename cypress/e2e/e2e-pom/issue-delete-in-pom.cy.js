/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //locate delete button
    IssueModal.clickDeleteButton()
    //Confirm to delete
    IssueModal.confirmDeletion()
    //Assert the issue is not visible
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle)
  });

  it('Should cancel deletion process successfully', () => {
    //locate delete button
    IssueModal.clickDeleteButton()
    //cancel the deletion
    IssueModal.cancelDeletion()
    //close the window
    IssueModal.closeDetailModal()
    //check the issue is visible on the board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)

  });
});