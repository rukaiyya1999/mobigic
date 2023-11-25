const Mongoose = require("mongoose");
const registerSchema = new Mongoose.Schema({
    userName : {
        require : true,
        type : String
    },
    password : {
        require : true,
        type : String
    }
})
module.exports = Mongoose.model("registerUser", registerSchema)