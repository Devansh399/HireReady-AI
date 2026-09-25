const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
{


   username: {
       type:String,
       unique:[true, "Username alredy exist"],
       require:true
    },

      email: {
        type: String,
        unique: [ true, "Account already exists with this email address" ],
        required: true,
    },

    password: {
        type: String,
        required:true,
    }   
}

)

const userModel = mongoose.model("users",  UserSchema)

module.exports = userModel;