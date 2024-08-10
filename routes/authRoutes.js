// const express = require('express');
// const router = express.Router();
// const { login, register } = require('../controllers/authController');

// router.post('/login', login);
// router.post('/register', register); //http://localhost:5000/api/auth/register

// module.exports = router;

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

