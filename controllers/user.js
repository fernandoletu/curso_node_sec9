const {request, response} = require('express')
const User = require('../models/user')

//All methods for User

const userGet = (req = request, res = response) => {
    const {nombre, edad, page = 1} = req.query

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
    await user.save()

    res.status(200).json({
        msg: 'Ok',
    })
}

const userPut = async(req, res = response) => {
    const id = req.params.id

    res.status(200).json({
        msg: 'put',
        id
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