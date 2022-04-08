describe("example test",()=>{
    it("test login",()=>{
        cy.visit("http://localhost:3000/registrarUser")
        // si revisan el email tiene quue ser unico
        cy.get("input[name='email']").type("dany2@skater.com")
        cy.get("input[name='nombre']").type('daniel')
        cy.get("input[name='password']").type("1212")
        cy.get("input[name='password2']").type("1212")
        cy.get("input[name='anos_experiencia']").type("12")
        cy.get("input[name='especialidad']").type("hardflip")
        /* cy.get("button").click() */
    })
})
