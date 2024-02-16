const express = require('express')
const{Register, Login, signOut} = require('../controller/user.js');
const { authUser } = require('../middleware/auth.js');
const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/signout', authUser, signOut);

module.exports = router;