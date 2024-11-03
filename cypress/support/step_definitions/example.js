import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("Open Google page", () => {
  cy.visit("https://www.google.com");
});

When("Search for {string}", (searchTerm) => {
  cy.get(".gLFyf").type(searchTerm + "{enter}");
});

Then("Show {string} in the results", (expectedText) => {
  cy.contains(expectedText).should("be.visible");
});
