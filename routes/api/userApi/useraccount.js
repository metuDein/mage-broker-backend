const express = require('express');
const { handleUserAccount } = require('../../../controllers/userController/userEditAccount');
const router = express.Router()


router.patch('/', handleUserAccount);


module.exports = router;