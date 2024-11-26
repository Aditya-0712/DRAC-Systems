const userModel = require("../models/userModel");
const businessModel = require("../models/businessModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) =>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const checkPassword = async (password, hashedPassword) =>{
    const isCorrect = await bcrypt.compare(password, hashedPassword);
    return isCorrect;
}

exports.register = async (req, res) =>{
    const { email, password, phno } = req.body;

    try{
        const checkExistingUser = await userModel.findOne({email:email});
        if (checkExistingUser){
            res.status(409).send({success:false, message:"This email is already registered"});
            return;
        }

        const phoneNumber = "+91" + String(phno);
        const hashedPassword = await hashPassword(password);
        const newBusiness = await businessModel.create({});
        const newUser = await userModel.create({
            email:email,
            phoneNumber:phoneNumber,
            password:hashedPassword,
            business:newBusiness._id
        });

        if (newBusiness && newUser){
            res.status(201).send({success:true, message:"Account created succesfully"});
            return;
        }
    }
    catch(error){
        console.log("Error in registering account\n" + error);
        res.status(500).send({success:false, message:"Unknown error"});
    }
}

exports.login = async (req, res)=>{
    const {email, password} = req.body;

    try{
        const userData = await userModel.findOne({email:email});

        if (!userData){
            console.log("User does not exist");
            res.status(404).send({success:false, message:"User does not exist"});
            return;
        }

        const hashedPassword = userData.password;
        const isCorrect = await checkPassword(password, hashedPassword);
        if (!isCorrect){
            console.log("Wrong password");
            res.status(401).send({success:false, message:"Wrong password"});
            return;
        }

        const token = jwt.sign({email:email}, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.status(200).send({success:true, message:"Login successful", token:token});
    }
    catch(error){
        console.log("Error while logging in\n" + error);
        res.status(500).send({success:false, message:"Unknown error"});
    }
}

exports.getUserData = async (req, res) =>{
    const email = req.user.email;

    try{
        const userData = await userModel.findOne({email:email});

        if (!userData){
            console.log("User does not exist");
            res.status(404).send({success:false, message:"User does not exist"});
            return;
        }

        res.status(200).send({success:true, data:{businessId:userData.business, email:email}});
    }
    catch(err){
        console.log("Error occoured while fetching user data");
        res.status(500).send({success:false, message:"Unknown error"});
    } 
}