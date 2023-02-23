const mongoose = require('mongoose')
const validator = require('validator')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

const db = mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open",()=>console.log("DB Connected"))



