const mongoose = require('mongoose')
const monogoURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

const connectToMongo = ()=>{
    mongoose.connect(monogoURI,()=>{
        console.log("Succesfully connected to Mongo")
    })
}

module.exports = connectToMongo;