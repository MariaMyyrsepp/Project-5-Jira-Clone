describe("Assignment 2. Automation test for Time tracking functionality", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.url()
        .should("eq", `${Cypress.env("baseUrl")}project/board`)
        .then((url) => {
          cy.visit(url + "/board");
          cy.contains("This is an issue of type: Task.").click();
        });
    });
  
    const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
    const getTimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
    const Stopwatch = '[data-testid="icon:stopwatch"]';
  
    it("Should add, edit and delete estimation time", () => {
    //Add estimation
    getIssueDetailsModal().within(() => {
    cy.get('[placeholder="Number"]').click().clear().type("10");
  
    //Assert the estimation is added and visible.
    cy.contains("div", "10h estimated").should("be.visible");
  
    //Edit the estimation
    cy.get('[placeholder="Number"]').click().clear().type("12");
  
    //Assert that the updated value is visible
    cy.contains("div", "12h estimated").should("be.visible");
  
    //Remove the estimation
    cy.get('[placeholder="Number"]').click().clear();
  
    //Assert that the value is removed.
    cy.contains("div", "12h estimated").should("not.exist");
    });
    });
  
    it("Should log, edit and delete logged time", () => {
    //Log time
    cy.get(Stopwatch).click();
    getTimeTrackingModal().within(() => {
    cy.contains("Time spent (hours)");
    cy.get('[placeholder="Number"]').first().click().clear().type("8");
    cy.contains("Time remaining (hours)");
    cy.get('[placeholder="Number"]').last().click().clear().type("0");
    cy.contains("button", "Done").click().should("not.exist");
    });
  
    //Assert that the logged time is added and visible
    getIssueDetailsModal().within(() => {
    cy.contains("div", "8h logged").should("exist");
    cy.contains("div", "0h remaining").should("exist");
    });

    //Edit the logged time
    cy.get(Stopwatch).click();
    getTimeTrackingModal().within(() => {
    cy.contains("Time spent (hours)");
    cy.get('[placeholder="Number"]').first().click().clear().type("6");
    cy.contains("Time remaining (hours)");
    cy.get('[placeholder="Number"]').last().click().clear().type("2");
    cy.contains("button", "Done").click().should("not.exist");
    });

    //Assert that the updated value is visible
    getIssueDetailsModal().within(() => {
    cy.contains("div", "6h logged").should("exist");
    cy.contains("div", "2h remaining").should("exist");
    });

    //Remove the logged time
    cy.get(Stopwatch).click();
    getTimeTrackingModal().within(() => {
    cy.contains("Time spent (hours)");
    cy.get('[placeholder="Number"]').first().click().clear();
    cy.contains("Time remaining (hours)");
    cy.get('[placeholder="Number"]').last().click().clear();
    cy.contains("button", "Done").click().should("not.exist");
    });

    //Assert that the value is removed
    getIssueDetailsModal().within(() => {
    cy.contains("div", "No time logged").should("exist");
    cy.contains("div", "8h estimated").should("be.visible");
    });
    });
  });