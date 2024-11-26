const userModel = require("../models/userModel");
const businessModel = require("../models/businessModel");

exports.getPeople = async (req, res) =>{
    const email = req.user.email;

    try{
        const userData = await userModel.findOne({email:email}).populate("business");

        if (!userData){
            console.log("User does not exist");
            res.status(404).send({success:false, message:"User does not exist"});
            return;
        }

        res.status(200).send({
            success:true,
            data: userData.business.people
        });
    }
    catch(err){
        console.log("Error in getPeople\n" + err);
        res.status(500).send({success:false, message:"Unknown error"});
    }
}

exports.addPeople = async (req, res) =>{
    const sessEmail = req.user.email;
    const {name, role} = req.body;

    try{
        const userData = await userModel.findOne({email:sessEmail});

        if (!userData){
            console.log("User does not exist");
            res.status(404).send({success:false, message:"User does not exist"});
            return;
        }

        const businessData = await businessModel.findById(userData.business);
        businessData.people.push({name, role});
        await businessData.save();

        res.status(201).send({success:true, message:"Person added"});
    }
    catch(err){
        console.log("Error in addPeople\n" + err);
        res.status(500).send({success:false, message:"Unknown error"});
    }
}