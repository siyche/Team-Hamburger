describe("Acceptance Tests", () => {
  it("Tests Login Features", () => {
    // FEATURE: USER SIGN-IN

    /* Background:
     * Given I have opened the website for the first time
     * Then I will be prompted to sign in
     */

    cy.visit(
      "https://hamburgers-calendar-h0cpb6f7bbczfyae.westus2-01.azurewebsites.net/month"
    );

    /* Scenario: Successful sign in
     * Given I enter a registered email and password
     * When I click “Sign in”
     * Then I should have successfully logged in
     * And been redirected to the main calendar page
     */

    // Check for successful login with valid email & password
    cy.get(".mt-2 input").first().type("test@test.com");
    cy.get(".mt-2 input").first().should("have.value", "test@test.com");

    cy.get(".mt-2 input").last().type("1!Aaaaaa");
    cy.get(".mt-2 input").last().should("have.value", "1!Aaaaaa");

    // Sign in
    cy.contains("button", "Sign in").last().click();
    cy.url().should("include", "/month");

    // Return back to sign-in page
    cy.visit(
      "https://hamburgers-calendar-h0cpb6f7bbczfyae.westus2-01.azurewebsites.net/login"
    );

    /* Scenario: Wrong Username
     * Given I enter a non-registered email and password
     * When I click “Sign in”
     * Then I should not be logged in
     * And not been redirected to the main calendar page
     */

    // Check for unsuccessful login with unregistered email & valid password
    cy.get(".mt-2 input").first().type("newemail@test.com");
    cy.get(".mt-2 input").first().should("have.value", "newemail@test.com");

    cy.get(".mt-2 input").last().type("1!Aaaaaa");
    cy.get(".mt-2 input").last().should("have.value", "1!Aaaaaa");

    // Sign in (should be unsuccessful)
    cy.contains("button", "Sign in").last().click();
    cy.contains("Invalid email or password.");

    // Return back to sign-in page (just in case)
    cy.visit(
      "https://hamburgers-calendar-h0cpb6f7bbczfyae.westus2-01.azurewebsites.net/login"
    );

    /* Scenario: Wrong Password
     * Given I enter a registered email and invalid password
     * When I click “Sign in”
     * Then I should not be logged in
     * And not been redirected to the main calendar page
     */

    // Check for unsuccessful login with unregistered email & valid password
    cy.get(".mt-2 input").first().type("test@test.com");
    cy.get(".mt-2 input").first().should("have.value", "test@test.com");

    cy.get(".mt-2 input").last().type("wrong_password");
    cy.get(".mt-2 input").last().should("have.value", "wrong_password");

    // Sign in (should be unsuccessful)
    cy.contains("button", "Sign in").last().click();
    cy.contains("Invalid email or password.");

    // Return back to sign-in page (just in case)
    cy.visit(
      "https://hamburgers-calendar-h0cpb6f7bbczfyae.westus2-01.azurewebsites.net/login"
    );
  });
});
