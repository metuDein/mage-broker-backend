const express = require('express');
const router = express.Router()
const { newRequest } = require('../../../controllers/userController/usersupportrequest');



router.post('/', newRequest);


module.exports = router;