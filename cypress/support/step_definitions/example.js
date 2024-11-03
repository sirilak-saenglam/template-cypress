import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { select_user_name } from '../query_database/example';

Given("Open Google page", () => {
  cy.visit("https://www.google.com");
});

When("Search for {string}", (searchTerm) => {
  cy.get(".gLFyf").type(searchTerm + "{enter}");
});

Then("Show {string} in the results", (expectedText) => {
  cy.contains(expectedText).should("be.visible");
});

Given("The database is connected", () => {
  cy.log("Connected to the database.");
});

When("Query firstname {string}", (firstname) => {
  select_user_name(firstname).as("dbResult"); // เรียกใช้ task queryDatabase
});

Then("Should get firstname {string}", function (firstname) {
  cy.get("@dbResult").then((result) => {
    expect(result[0].firstname).to.equal(firstname) // ตรวจสอบว่ามีข้อมูลมากกว่า 0 แถว
  });
});
