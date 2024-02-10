const User = require("../model/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




exports.Register = async(req,res)=>{

    try{
        const{fullName, email, password, userType, avatar, gender} = req.body

        const cryptedPassword = await bcrypt.hash(password, 12)

        const existEmail = await User.findOne({email})

        if(existEmail){
            return res.status(400).json({
                "message" : "This email are already used"
            })
        }

        const user = await new User({
            fullName,
            password: cryptedPassword,
            email,
            userType,
            avatar,
            gender
           
        }).save();

        res.status(200).json(user)


    }catch(error){
        res.status(500).json({
            "message" : "Internal server error"
        })
    }
    

}

exports.Login = async(req,res)=> {
    try{
        const {email, password} = req.body;
        const validUser = await User.findOne({email: email});
        if(!validUser){
            return res.status(401).json({
                message: "Email is not found"
            })
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword){
            return res.status(401).json({
                message: "Incorrect Password"
            })
        } 

        const token = jwt.sign({id: validUser._id}, process.env.SECRET_KEY)

        return res.status(200).json({
            email: validUser.email,
            fullName: validUser.fullName,
            userType: validUser.userType,
            gender: validUser.gender,
            avatar: validUser.avatar,
            token: token
        })

    }catch(error){

        return res.status(500).json({
            "message" : "Internal server error"
        })

    }
}