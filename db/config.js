const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        const connectionString = process.env.DB_CONNECTION + '/' + process.env.DB_DATABASE

        await mongoose.connect(connectionString, {
            //useNewUrlParse: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false,
        })

        console.log('DB connected')

    }catch (error) {
        throw new Error('Error while connecting DB - ' + 'Error= ' + error.message)
    }
}

module.exports = {
    dbConnection,
}