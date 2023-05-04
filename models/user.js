const {Schema, model} = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['ADMIN', 'USER']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        required: false,
    },
},
    {collection: 'user'}
)

UserSchema.methods.toJSON = function () {
    const { __v, status, password, ...user } = this.toObject()

    return user
}

module.exports = model('User', UserSchema)