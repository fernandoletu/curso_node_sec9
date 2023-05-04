const Role = require('../models/role')
const User = require('../models/user')

//DB validations
const isRoleValid = async(value = '') => {
    const exists = await Role.findOne({name: value})
    if (!exists){
        throw new Error(`Role ${value} does not exist in DB`)
    }
}

const emailExists = async(value = '') => {
    const exists = await User.findOne({email: value})
    if (exists){
        throw new Error(`Email ${value} already exists in DB`)
    }
}

const userExistsByID = async(id = '') => {
    const exists = await User.findById(id)
    if (!exists){
        throw new Error(`ID ${id} does not exist in DB`)
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsByID,
}