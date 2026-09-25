
const mongoose = require("mongoose");


async function connectToDB() {
    try{

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected ...")
    }catch(error){
        console.error("Database connection failed", error.message);
        process.exist(1);
        
    }

}

module.exports = connectToDB;