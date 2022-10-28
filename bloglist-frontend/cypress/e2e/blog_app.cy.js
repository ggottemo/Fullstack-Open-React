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
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "testpassword" });
    });
    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Test Blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("Test URL");
      cy.get("#create-button").click();
      cy.refresh();
      cy.contains("Test Blog");
    });
    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test Blog",
          author: "Test Author",
          url: "Test URL",
          user: {
            name: "Test User",
            username: "testuser",
            password: "testpassword",
          },
        });
      });
      it("it can be liked", function () {
        cy.contains("Test Blog").contains("view").click();
        cy.contains("Test Blog").contains("like").click();
        cy.contains("Test Blog").contains("likes 1");
      });
      it("blogs are ordered by likes", function () {
        cy.createBlog({
          title: "Test Blog 2",
          author: "Test Author 2",
          url: "Test URL 2",
          likes: 2,
          user: {
            name: "Test User",
            username: "testuser",
            password: "testpassword",
          },
        });
        cy.createBlog({
          title: "Test Blog 3",
          author: "Test Author 3",
          url: "Test URL 3",
          likes: 3,
          user: {
            name: "Test User",
            username: "testuser",
            password: "testpassword",
          },
        });
        cy.contains("Test Blog 3").contains("view").click();
        cy.contains("Test Blog 3").contains("like").click();
        cy.contains("Test Blog 3").contains("like").click();
        cy.contains("Test Blog 3").contains("like").click();
        cy.contains("Test Blog 2").contains("view").click();
        cy.contains("Test Blog 2").contains("like").click();
        cy.contains("Test Blog 2").contains("like").click();
        cy.contains("Test Blog").contains("view").click();
        cy.contains("Test Blog").contains("like").click();
        cy.wait(5000);
        cy.refresh();
        cy.get(".blog").then((blogs) => {
          cy.wrap(blogs[0]).contains("Test Blog 3");
          cy.wrap(blogs[1]).contains("Test Blog 2");
          cy.wrap(blogs[2]).contains("Test Blog");
        });
      });
    });
  });
});
