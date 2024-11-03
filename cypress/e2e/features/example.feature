Feature: Google search and conenction database
 
  Scenario: Searching for cypress documentation
    Given Open Google page
    When Search for "Cypress.io"
    Then Show "cypress.io" in the results

  Scenario: Connection database
    Given The database is connected
    When Query firstname "super"
    Then Should get firstname "super"