const express = require('express');
const router = express.Router(); 
const { handleRegister } = require('../../controllers/AuthEmailController');


router.post('/', handleRegister);

module.exports = router;