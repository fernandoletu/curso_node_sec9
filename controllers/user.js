const {request, response} = require('express')
const User = require('../models/user')
const bcryptjs = require("bcryptjs");

//All methods for User

const userGet = (req = request, res = response) => {
    const {nombre, edad, page = 1} = req.query

    //const listado = await User.getAll()

    res.status(200).json({
        msg: 'get',
        nombre,
        edad,
        page,
    })
}

const userPost = async(req, res = response) => {
    const {name, email, password, role} = req.body

    const user = new User()
    user.name = name
    user.email = email
    user.password = password
    user.role = role

    //Encrypt password
    const passwordSalt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(user.password, passwordSalt)

    //Save to DB
    await user.save()

    res.status(201).json({
        msg: 'Ok',
        data: user,
    })
}

const userPut = async(req, res = response) => {
    const {id} = req.params
    //Params extracted won't be modified in DB model (_id, password, google, email)
    const {_id, password, google, ...params} = req.body

    if (password) {
        //Encrypt password
        const passwordSalt = bcryptjs.genSaltSync()
        params.password = bcryptjs.hashSync(password, passwordSalt)
    }

    //Save to DB
    //Only attributes included in 'params' will be updated
    const userDB = await User.findByIdAndUpdate(id, params, {new: true})

    res.status(200).json({
        msg: 'Ok',
        data: userDB,
    })
}

const userDelete = async(req, res = response) => {
    const id = req.params.id

    res.status(200).json({
        msg: 'delete',
        id
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
}