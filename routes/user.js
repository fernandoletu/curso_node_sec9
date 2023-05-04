const {Router} = require('express')
const {userGet, userPost, userPut, userDelete} = require("../controllers/user");
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validations");
const {isRoleValid, emailExists, userExistsByID} = require("../helpers/db-validations");
const Role = require('../models/role')

const router = Router()

//All application routes
//A single route references to controller

//User
router.get('/', userGet)
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, 6 characteres min').isLength({min: 6}).not().isEmpty(),
    check('email').custom(emailExists),
    check('role').custom(isRoleValid),  //It`s the same as check('role').custom((role) => isRoleValid(role)),
    validateFields
], userPost)
router.put('/:id', [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(userExistsByID),
    check('role').custom(isRoleValid),
    validateFields
], userPut)
router.delete('/:id', userDelete)

module.exports = router