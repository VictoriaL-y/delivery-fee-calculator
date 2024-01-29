describe('delivery fee calculator', () => {
  it('renders all the main elements on the screen', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="calculator-container"]').should("exist");

    cy.get('[data-testid="header"]').should("exist")
      .should("have.text", "Delivery Fee Calculator");

    cy.get('[data-testid="form"]').should("exist");

    cy.get('[data-testid="cartValue"]').should("exist")
      .click;

    cy.get('[data-testid="deliveryDistance"]').should("exist");

    cy.get('[data-testid="numberOfItems"]').should("exist");

    cy.get('[data-testid="orderTime"]').should("exist");

    cy.get('[data-testid="submit"').should("exist");

    cy.get('[data-testid="fee"]').should("exist")
      .should("have.text", "Total: 0€");
  });

  describe("shows validation errors", () => {
    it("3 errors: user hasn't entered anything into the blank input fileds", () => {
      cy.visit('http://localhost:3000/');

      cy.get('[data-testid="submit"').click();

      cy.get('[data-testid="error-cartValue"').should('exist')
        .should("have.text", "This field is required");
      cy.get('[data-testid="error-deliveryDistance"').should('exist')
        .should("have.text", "This field is required");
      cy.get('[data-testid="error-numberOfItems"').should('exist')
        .should("have.text", "This field is required");
    });
    it("4 errors: user hasn't entered anything into the blank input fileds and reset the default delivery time", () => {
      cy.visit('http://localhost:3000/');

      cy.get('.react-datetime-picker__clear-button').click();

      cy.get('[data-testid="submit"').click();

      cy.get('[data-testid="error-cartValue"').should('exist')
        .should("have.text", "This field is required");
      cy.get('[data-testid="error-deliveryDistance"').should('exist')
        .should("have.text", "This field is required");
      cy.get('[data-testid="error-numberOfItems"').should('exist')
        .should("have.text", "This field is required");
      cy.get('[data-testid="error-orderTime"').should('exist')
        .should("have.text", "This field is required");
    });
    it("3 errors: user has entered non-numeric values into the blank input fileds", () => {
      cy.visit('http://localhost:3000/');

      cy.get('[data-testid="cartValue"]').type("one hundred");
      cy.get('[data-testid="deliveryDistance"]').type("two kilometers");
      cy.get('[data-testid="numberOfItems"]').type("seven");

      cy.get('[data-testid="submit"').click();

      cy.get('[data-testid="error-cartValue"').should('exist')
        .should("have.text", "This input is a number only");
      cy.get('[data-testid="error-deliveryDistance"').should('exist')
        .should("have.text", "This input is a whole number only");
      cy.get('[data-testid="error-numberOfItems"').should('exist')
        .should("have.text", "This input is a whole number only");
    });
    it("2 errors: user has entered float numbers into the blank input fields", () => {
      cy.visit('http://localhost:3000/');

      cy.get('[data-testid="cartValue"]').type("2.5");
      cy.get('[data-testid="deliveryDistance"]').type("1.200");
      cy.get('[data-testid="numberOfItems"]').type("5.7");

      cy.get('[data-testid="submit"').click();

      cy.get('[data-testid="error-cartValue"').should('not.exist');
      cy.get('[data-testid="error-deliveryDistance"').should('exist')
        .should("have.text", "This input is a whole number only");
      cy.get('[data-testid="error-numberOfItems"').should('exist')
        .should("have.text", "This input is a whole number only");
    });
  });

  describe("success, all the input fields filled out correctly", () => {
    it("shows the total delivery fee after filling in the empty fields, no errors", () => {
      cy.visit('http://localhost:3000/');

      cy.get('[data-testid="cartValue"]').type("2.56");
      cy.get('[data-testid="deliveryDistance"]').type("1200");
      cy.get('[data-testid="numberOfItems"]').type("5");

      cy.get('[data-testid="submit"').click();

      cy.get('[data-testid="error-cartValue"').should('not.exist');
      cy.get('[data-testid="error-deliveryDistance"').should('not.exist');
      cy.get('[data-testid="error-numberOfItems"').should('not.exist');
      cy.get('[data-testid="error-orderTime"').should('not.exist');

      cy.get('[data-testid="fee"]').should("have.text", "Total: 10.94€");
    });

    // I'm not testing the calendar element, because it's a popular well tested open source library, it should work out of the box
  });
});