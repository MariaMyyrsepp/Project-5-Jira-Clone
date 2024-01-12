describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const comment = 'TEST_COMMENT';
    const editedComment = 'EDIT_TEST_COMMENT';

it('Should create a comment successfully', () => {
    const comment = 'TEST_COMMENT';

    getIssueDetailsModal().within(() => {
    cy.contains('Add a comment...')
    .click();

    cy.get('textarea[placeholder="Add a comment..."]').type(comment);
    cy.contains('button', 'Save')
    .click()
    .should('not.exist');

    cy.contains('Add a comment...').should('exist');
    cy.get('[data-testid="issue-comment"]').should('contain', comment);
    });
    });

    it('Should edit a comment successfully', () => {
        const previousComment = 'An old silent pond...';
        const comment = 'EDIT_TEST_COMMENT';

    getIssueDetailsModal().within(() => {
    cy.get('[data-testid="issue-comment"]')
    .first()
    .contains('Edit')
    .click()
    .should('not.exist');

    cy.get('textarea[placeholder="Add a comment..."]')
    .should('contain', previousComment)
    .clear()
    .type(comment);

    cy.contains('button', 'Save')
    .click()
    .should('not.exist');

    cy.get('[data-testid="issue-comment"]')
    .should('contain', 'Edit')
    .and('contain', comment);
    });
    });

    it('Should delete a comment successfully', () => {
        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .contains('Delete')
            .click();

        cy.get('[data-testid="modal:confirm"]')
            .contains('button', 'Delete comment')
            .click()
            .should('not.exist');

        getIssueDetailsModal()
            .find('[data-testid="issue-comment"]')
            .should('not.exist');
    });
});

it('Should add a comment, edit and delete it successfully', () => {
    getIssueDetailsModal();
    
    //Add a comment
    cy.contains('Add a comment...').click();
    cy.get('[placeholder="Add a comment..."]').type(comment);
    cy.contains('button', 'Save').click().should('not.exist');
    
    //Assert that the comment has been added and is visible
    cy.reload()
    cy.get('[data-testid="issue-comment"]').should('contain', comment);
    
    //Edit the added comment
    cy.get('[data-testid="issue-comment"]').first().contains('Edit').click();
    cy.get('[placeholder="Add a comment..."]').clear().type(editcomment);
    cy.contains('button', 'Save').click().should('not.exist');
    
    //Assert that the updated comment is visible
    cy.reload()
    cy.get('[data-testid="issue-comment"]').should('contain', editcomment);
    
    //Remove the comment.
    cy.get('[data-testid="issue-comment"]').first().contains('Delete').click();
    cy.get('[data-testid="modal:confirm"]').contains('Are you sure you want to delete this comment?')
    cy.contains('Delete comment').click();
    
    //Assert that the comment is removed.
    cy.reload()
    cy.get('[data-testid="issue-comment"]').contains(editcomment).should('not.exist');
});