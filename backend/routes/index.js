const router = require('express').Router();
const loginCtrl = require('../controllers/login-controller');

router.post('/login', loginCtrl.login)
router.post('/registration', loginCtrl.registerUser)

module.exports = router