const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) =>{
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        console.log("Token not found");
        return res.status(401).send({success:false, messsage:"Token not found"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if (err){
            console.log(err);
            return res.status(403).send({success:false, message:"Unknown error in middleware"});
        }

        req.user = decoded;

        next();
    });
};

module.exports = authenticateToken;