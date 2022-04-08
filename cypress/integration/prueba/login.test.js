describe("example test",()=>{
    it("test login",()=>{
        cy.visit("http://localhost:3000/login")
        cy.get("input[name='emaillogin']").type("dany@skater.com")
        cy.get("input[name='passwordlogin']").type('1212')
        cy.get("button").click()
    })
})
