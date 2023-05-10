const {request, response} = require('express')
const User = require('../models/user')
const bcryptjs = require("bcryptjs");

//All methods for User

const userGet = async(req = request, res = response) => {
    const {id, nombre, email, page = 1, limit = 20} = req.query

    const query = {
        status: true,
        ...(id != null) && {_id: id},
        ...(nombre != null) && {name: {$regex: nombre, $options: "i"}},  //i for case insensitive
        ...(email != null) && {email: {$regex: email, $options: "i"}}
    }

    //Format 1
    /*const list = await User.find(query)
        .limit(Number(limit))*/
    //const itemsTotal = await User.countDocuments(query)

    //Format 2 (all queries run at the same time)
    const [itemsTotal, list] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(Number(limit))
    ])

    res.status(200).json({
        msg: 'Ok',
        data: {
            pageCurrent: page,
            pageTotal: 1,
            itemsTotal: itemsTotal,
            data: list
        },
    })
}

const userDataGet = async(req = request, res = response) => {
    const {id} = req.params

    const userDB = await User.findById(id,
        'name email')  //Select only name and email fields

    res.status(200).json({
        msg: 'Ok',
        data: userDB,
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
    const {id} = req.params

    //Physical delete
    //const userDB = await User.findByIdAndDelete(id)

    //Soft delete
    const userDB = await User.findByIdAndUpdate(id, {status: false})

    res.status(200).json({
        msg: 'Ok',
        data: userDB
    })
}

module.exports = {
    userGet,
    userDataGet,
    userPost,
    userPut,
    userDelete,
}