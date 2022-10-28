/* eslint-disable no-undef */

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "testpassword",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  describe("Login", function () {
    it("Login form is shown", function () {
      cy.visit("http://localhost:3000");
      cy.contains("Log in to application");
      cy.contains("username");
      cy.contains("password");
      cy.contains("login");
    });
    it("Fails with wrong credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();
      cy.contains("Wrong username or password");
    });
    it("Succeeds with correct credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("testpassword");
      cy.get("#login-button").click();
      cy.contains("Test User logged in");
    });
  });
});
