const mongoose = require("mongoose");

const businessSchema = mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    people: [{
        // userId: {
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // },
        name: {
            type:String,
            required: true
        },
        role: {
            type: String,
            enum: ["Administrator", "Developer", "Tester", "Analyst"],
            required: true
        }
    }]
});

module.exports = new mongoose.model('Business', businessSchema);