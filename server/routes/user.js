const express = require('express')
const{Register, Login, signOut, profileUpdate, doctorProfileUpdate, doctorProfileShow} = require('../controller/user.js');
const { authUser } = require('../middleware/auth.js');
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/signout', authUser, signOut);
router.post('/profile-update', authUser, profileUpdate);
router.post('/doctor-profile-update', authUser, doctorProfileUpdate);
router.get('/doctor-profile-show', authUser, doctorProfileShow);

module.exports = router;