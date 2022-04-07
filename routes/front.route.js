const { Router } = require("express")
const {getSkatersDB, getAdmiDB} = require("../database/index")
const router = Router()

router.get("/", async (req, res) => {
    const rows = await getSkatersDB()
    res.render("index", {rows})
})

router.get("/login", (req, res) => {
    res.render("iniciarSeccion")
})

router.get("/registrarUser", (req, res) => {
    res.render("registraUsuario")
})

router.get("/admi", async (req, res) => {
    const rows = await getAdmiDB()
    res.render("admi", {rows})
    
})

router.get("/editarperfil", (req, res) => {
    res.render("editarPerfil")
})
router.get("/eliminar",(req, res)=>{
    res.render('eliminar')
})




module.exports = router