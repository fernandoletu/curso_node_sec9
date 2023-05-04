const {Schema, model} = require('mongoose')

const RoleSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
},
    {collection: 'role'}
)

module.exports = model('Role', RoleSchema)