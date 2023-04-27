const {Router} = require('express')
const {userGet, userPost, userPut, userDelete} = require("../controllers/user");

const router = Router()

//All application routes
//A single route references to controller

//User
router.get('/', userGet)
router.post('/', userPost)
router.put('/:id', userPut)
router.delete('/:id', userDelete)

module.exports = router