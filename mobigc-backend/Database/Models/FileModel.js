const Mongoose = require("mongoose");
const fileSchema = new Mongoose.Schema({
    id : {
        type : String
    },
    fileName : {
        type : String
    },
    filePath : {
        type: String
    },
    code : {
        type : Number
    }
})
module.exports = Mongoose.model("files", fileSchema)