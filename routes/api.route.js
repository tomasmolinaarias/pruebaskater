const express = require('express');
const { getSkaters, postUsers, getLogin,getAdMIN, deleteUser, updateUser,  } = require('../controllers/user.controlle');
const { requireAuth } = require('../middlewares/requireAuth');
const router = express.Router();

router.get('/', getSkaters)
router.post('/login', getLogin)
router.post('/registrarUser',postUsers)
router.get('/admi',requireAuth,getAdMIN )
router.delete('/eliminar',requireAuth,deleteUser)
router.put('/editarperfil',requireAuth,updateUser)


module.exports = router;
