const mongoose = require('mongoose');
require("dotenv").config();

const connectToDatabase = async () =>{
    try{
        const conn = mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to database succesfully");
    }
    catch(error){
        console.log("Couldn't connect to database\n" + error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;