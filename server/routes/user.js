const express = require('express')
const{Register, Login, signOut, profileUpdate, doctorProfileUpdate, doctorProfileShow, allDoctor, deleteUser, specificDoctor, stripePayment, userRating} = require('../controller/user.js');
const { authUser } = require('../middleware/auth.js');
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/signout', authUser, signOut);
router.post('/profile-update', authUser, profileUpdate);
router.post('/doctor-profile-update', authUser, doctorProfileUpdate);
router.get('/doctor-profile-show', authUser, doctorProfileShow);
router.get('/all-doctor',  allDoctor);
router.get('/delete-user', authUser, deleteUser);
router.get('/specific-doctor/:id', specificDoctor);
router.post('/stripe-payment/:doctorId', authUser, stripePayment);
router.post('/user-rating/:userId/:doctorId', authUser, userRating);

module.exports = router;