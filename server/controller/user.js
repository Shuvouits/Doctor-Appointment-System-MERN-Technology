const User = require("../model/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Stripe = require('stripe');
const Booking = require('../model/booking');
const Rating = require('../model/userRating');




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

        const passLength = password.length > 6;

        if(!passLength){
            return res.status(400).json({
                "message" : "Password at lest 6 character or number"
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
        res.status(500).json(error)
    }
    

}

exports.Login = async(req,res)=> {
    try{
        const {email, password} = req.body;
        const validUser = await User.findOne({email: email});
        if(!validUser){
            return res.status(400).json({
                message: "Email is not found"
            })
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword){
            return res.status(400).json({
                message: "Incorrect Password"
            })
        } 

        const token = jwt.sign({id: validUser._id}, process.env.SECRET_KEY)

        return res.status(200).json({
            id: validUser._id,
            email: validUser.email,
            fullName: validUser.fullName,
            userType: validUser.userType,
            gender: validUser.gender,
            avatar: validUser.avatar,
            blood: validUser.blood, 
            token: token
        })

    }catch(error){

        return res.status(500).json({
            "message" : "Internal server error"
        })

    }
}

exports.signOut = async (req, res) => {
    try {

        let tmp = req.header("Authorization");
        tmp = null
        const token = tmp;
        return res.status(200).json({
            "message" : "User has been logged out"
        })

    } catch (error) {
        res.status(500).json(error)

    }

}

exports.profileUpdate = async(req,res)=>{
    try{

        let tmp = req.header("Authorization");
        const token = tmp ? tmp.slice(7, tmp.length) : "";
        const userId = req.user.id;
        const { fullName, email, password, avatar, group, blood, userType } = req.body;

        let cryptedPassword;
        if (password) {
            cryptedPassword = await bcrypt.hash(password, 12)
        }

        const updateUser = await User.findByIdAndUpdate(userId, { fullName, email, avatar, password: cryptedPassword, group, blood, userType }, { new: true })


        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            id: updateUser._id,
            email: updateUser.email,
            fullName: updateUser.fullName,
            avatar: updateUser.avatar,
            token: token,
            gender: updateUser.gender,
            blood: updateUser.blood,
            message: 'User information updated'
        })


    }catch(error){
        return res.status(500).json(error)
    }
}

exports.doctorProfileUpdate = async(req, res)=> {
    try{

        let tmp = req.header("Authorization");
        const token = tmp ? tmp.slice(7, tmp.length) : "";
        const userId = req.user.id;

        const updateData = req.body;

        

        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

        if(!updateData){
            return res.status(400).json({
                message: "Profile is not updated"
            })
        }

        return res.status(200).json({
            email: updateUser.email,
            fullName: updateUser.fullName,
            userType: updateUser.userType,
            gender: updateUser.gender,
            avatar: updateUser.avatar,
            blood: updateUser.blood, 
            token: token
        })

    }catch(error){
        return res.status(500).json(error)
    }
}

exports.doctorProfileShow = async(req, res) => {
    try{

        const userId = req.user.id;
        const user = await User.findById(userId);
        return res.send(user)

    }catch(error){
        return res.status(500).json(error)
    }
}

exports.allDoctor = async(req, res) => {

    try{

        const doctors = await User.find({userType: 'Doctor'});
        return res.status(200).json(doctors)

    }catch(error){
        return res.status(500).json(error)
    }
    
}

exports.deleteUser = async(req, res) => {
   

    try{

        const userId = req.user.id;
        console.log(userId)
        const user = await User.findByIdAndDelete(userId);
       
        if(!user){
            return res.status(401).json({
                message: 'User not found'
            })

        }

        return res.status(200).json({
            message: 'User removed successfully'
        })
      

    }catch(error){
        return res.status(500).json(error)
    }
}

exports.specificDoctor = async(req, res)=> {
    try{
        const doctor = await User.findById(req.params.id);
        res.send(doctor);

    }catch(error){
        return(error)
    }
}

exports.stripePayment = async (req, res) => {
    try {
        
        const doctor = await User.findById(req.params.doctorId);
        const user = await User.findById(req.user.id);


        const stripe = new Stripe(process.env.STRIPE_SECRET);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            mode : 'payment',

            line_items:[
                {
                    price_data:{
                        currency:'BDT',
                        unit_amount: Math.round(doctor.ticket *100),
                        product_data:{
                            images:[doctor.avatar],
                            name: doctor.fullName,
                            description:doctor.email,
                            
                        },
                        
                    },

                    quantity: 1
                
                }
            ]   

            
        });

        if (!session) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create Stripe session',
            });
        }

        const booking = await new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticket,
            session: session.id,
        }).save();

        return res.status(200).json({
            booking,
            session
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};  

exports.userRating = async (req, res) => {
    try {

        
        const userId = req.params.userId;
        
        const doctorId = req.params.doctorId;
        const {ratingNumber, message} = req.body;


        const rating = await new Rating({
            ratingNumber,
            message,
            userId,
            doctorId
        }).save();

        return res.status(200).json(rating)


    } catch (error) {
       return res.status(500).json(error)
    }
};  


exports.userReview = async (req, res) => {
    try {

        
        
        const doctorId = req.params.doctorId;
        
        const reviews = await Rating.find({doctorId: doctorId});

        const users = await Promise.all(reviews.map(async (review) => {
            const user = await User.findById(review.userId);
            return user;
          }));

          const responseData = reviews.map((review, index) => ({
            avatar: users[index].avatar,
            fullName: users[index].fullName,
            id: users[index]._id,
            message: review.message,
            ratingNumber: review.ratingNumber,
            time: review.createdAt
        }));


        return res.status(200).json(responseData)

    } catch (error) {
       return res.status(500).json(error)
    }
}; 


exports.deleteReview = async (req, res) => {
    try {
        
       const userId = req.user.id;
       const doctorId = req.params.doctorId
       const deleteReview = await Rating.findOneAndDelete({userId: userId, doctorId: doctorId});

       if(!deleteReview){
         return res.status(401).json({
            message: "Data not found"
        })
       }

       res.status(200).json({
        message: 'Review deleted successfully'
       })

    } catch (error) {
       return res.status(500).json(error)
    }
};

exports.allReview = async (req,res) => {
    try{

        const reviews = await Rating.find({});

       

        const users = await Promise.all(reviews.map(async (review) => {
            const user = await User.findById(review.userId);
            return user;
        }));

    

          const responseData = reviews.map((review, index) => ({
            avatar: users[index].avatar,
            fullName: users[index].fullName,
            email: users[index].email,
            message: review.message,
            ratingNumber: review.ratingNumber,
            time: review.createdAt,
        }));

        return res.status(200).json(responseData)


    }catch(error){
        return(error)
    }
}  

exports.doctorBooking = async (req, res) => {
    try{
        const userId = req.user.id;
        const data = await Booking.find({user: userId});
        
        const doctors = await Promise.all(data.map(async (item) => {
            const doctor = await User.findById(item.doctor);
            return doctor;
        }));

    

          const responseData = data.map((item, index) => ({
            avatar: doctors[index].avatar,
            fullName: doctors[index].fullName,
            email: doctors[index].email,
            id: doctors[index]._id,
            speciality: doctors[index].speciality,
            ticket: item.ticketPrice
        }));


        return res.status(200).json(responseData)


    }catch(error){
        return (error)
    }
}

exports. deleteBookingDoctor = async(req, res)=> {
    try{
        const userId = req.user.id;
        const doctorId = req.params.doctorId;

        const data = await Booking.findOneAndDelete({user: userId, doctor: doctorId})

        if(!data){
            return res.status(401).json({
                message: 'No data found'
            })
        }

        return res.status(200).json({
            message: 'Data deleted successfully'
        })

    }catch(error){
        return (error)
    }
}  

exports. patientList = async(req, res)=> {

    try{
        const doctorId = req.user.id;
        const patientList = await Booking.find({doctor: doctorId});

        const users = await Promise.all(patientList.map(async (item) => {
            const user = await User.findById(item.user);
            return user;
        })); 

        const responseData = patientList.map((item, index) => ({
            avatar: users[index].avatar,
            fullName: users[index].fullName,
            email: users[index].email,
            ticket: item.ticketPrice,
            time: item.createdAt,
            gender: users[index].gender,
        }));


        return res.status(200).json(responseData);

    }catch(error){
        return (error)
    }
}

