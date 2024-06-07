import { faker } from "@faker-js/faker";
describe("Teste promover usuário a administrador", function () {
    beforeEach(function () {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.createUser(nome, email, "123456", true)
        cy.login(email, "123456")
    })
    afterEach(function () {
        cy.inactivateUser()
    })
    it("Não deve ser possível fazer a promoção para crítico sem autenticar o usuário", function () {
        cy.request({
            method: "PATCH",
            url: "users/apply",
            failOnStatusCode: false
        }).then(function (response) {
            expect(response.body.statusCode).to.equal(401)
            expect(response.body.error).to.deep.equal("Unauthorized")
            expect(response.body.message).to.deep.equal("Access denied.")
        })
    })

    it("Deve ser possível fazer a promoção para crítico com um usuário propriamente logado e autenticado", function () {
        cy.request({
            method: "PATCH",
            url: "users/apply",
            failOnStatusCode: true,
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then(function (response) {
            expect(response.status).to.equal(204)
        })
    })

    it("Deve ser possível um usuário critico passar a ser um usuário admin", function () {

        cy.promoteCritic()
        cy.request({
            method: 'PATCH',
            url: 'users/admin',
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then(function (response) {
            expect(response.status).to.equal(204)
        })
    })
})
describe("Não deve ser possível fazer a promoção para crítico sem fazer o login do usuário", function () {
    it("Não deve ser possível fazer a promoção para crítico sem fazer o login do usuário", function () {
        cy.request({
            method: "PATCH",
            url: "users/apply",
            failOnStatusCode: false
        }).then(function (response) {
            expect(response.body.statusCode).to.equal(401)
            expect(response.body.error).to.deep.equal("Unauthorized")
            expect(response.body.message).to.deep.equal("Access denied.")
        })
    })
})
