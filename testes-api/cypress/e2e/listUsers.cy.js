import { faker } from "@faker-js/faker";
describe("Testes de listagem de usuarios", () => {
  let id;
  let token;
  let nome = faker.person.fullName();
  let email = faker.internet.email();
  beforeEach(() => {
    cy.createAndLoginUser(nome, email, "123456", true).then((data) => {
      id = data.id;
      Cypress.env("id", id);
      token = data.token;
      Cypress.env("accessToken", token);
    });
  });
  afterEach(() => {
    cy.inactivateWithToken(token);
  });
  it("Não deve ser possível possível um usuário comum acessar a lista de usuários", () => {
    cy.request({
      method: "GET",
      url: "users",
      headers: {
        Authorization: "Bearer " + token,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal("Forbidden");
    });
  });

  it("Não deve ser possível um usuário critico acessar a lista de usuários", () => {
    cy.promoteCriticWithToken(token);
    cy.request({
      method: "GET",
      url: "users",
      headers: {
        Authorization: "Bearer " + token,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal("Forbidden");
    });
  });
  it("Deve ser possível um usuário administrador acessar a lista de usuários", () => {
    cy.promoteAdminWithToken(token);
    cy.request({
      method: "GET",
      url: "users",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("Array")
    });
  });
});