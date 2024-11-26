const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        default:""
    },
    lastName: {
        type:String,
        default:""
    },
    email: {
        type:String,
        required:true
    },
    phoneNumber: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required:true
    },
    associations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    }]
}, {
    timestamps:true
});

module.exports = new mongoose.model('User', userSchema);