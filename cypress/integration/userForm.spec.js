describe("Form inputs", () => {
  it("can navigate to the site", () => {
    cy.visit("http://localhost:1234");
    cy.url().should("include", "localhost");
  });

  it("button is diabled", () => {
    cy.get("button.submit").should("be.disabled");
  });

  it("can type a name", () => {
    cy.get('input[name="name"]')
      .type("Jason Clegg")
      .should("have.value", "Jason Clegg");
  });

  it("can type an email", () => {
    cy.get('input[name="email"]')
      .type("jason@jason.com")
      .should("have.value", "jason@jason.com");
  });

  it("can type a password", () => {
    cy.get('input[name="password"]')
      .type("Password")
      .should("have.value", "Password");
  });

  it("can check a box", () => {
    cy.get('[type="checkbox"]').check();
  });
});

describe("Form validation", () => {
  it("validates form info correctly", () => {
    /////NAME/////
    cy.visit("http://localhost:1234");
    cy.contains("this must be at least 5 characters").should("not.exist");

    cy.get('input[name="name"]').type("a");
    cy.contains("this must be at least 5 characters");

    cy.get('input[name="name"]').type("b");
    cy.contains("this must be at least 5 characters").should("exist");

    cy.get('input[name="name"]').type("c");
    cy.contains("this must be at least 5 characters").should("exist");

    cy.get('input[name="name"]').type("d");
    cy.contains("this must be at least 5 characters").should("exist");

    cy.get('input[name="name"]').type("e");
    cy.contains("this must be at least 5 characters").should("not.exist");

    /////EMAIL/////

    cy.contains("Please use a valid email address").should("not.exist");

    cy.get('input[name="email"]').type("a");
    cy.contains("Please use a valid email address");

    cy.get('input[name="email"]').type("b");
    cy.contains("Please use a valid email address").should("exist");

    cy.get('input[name="email"]').type("@");
    cy.contains("Please use a valid email address").should("exist");

    cy.get('input[name="email"]').type("d");
    cy.contains("Please use a valid email address").should("exist");

    cy.get('input[name="email"]').type(".com");
    cy.contains("Please use a valid email address").should("not.exist");

    /////PASSWORD/////

    cy.contains("Please use a valid email address").should("not.exist");

    cy.get('input[name="password"]').type("a");
    cy.contains("this must be at least 8 characters");

    cy.get('input[name="password"]').type("b");
    cy.contains("this must be at least 8 characters").should("exist");

    cy.get('input[name="password"]').type("c");
    cy.contains("this must be at least 8 characters").should("exist");

    cy.get('input[name="password"]').type("d");
    cy.contains("this must be at least 8 characters").should("exist");

    cy.get('input[name="password"]').type("e");
    cy.contains("this must be at least 8 characters").should("exist");

    cy.get('input[name="password"]').type("f");
    cy.contains("this must be at least 8 characters").should("exist");

    cy.get('input[name="password"]').type("g");
    cy.contains("this must be at least 8 characters").should("exist");

    cy.get('input[name="password"]').type("h");
    cy.contains("this must be at least 8 characters").should("not.exist");

    cy.get('[type="checkbox"]').check();
  });
});
