const express = require('express');
const router = express.Router()
const { deleteMessage } = require('../../../controllers/userController/usersupportrequest');



router.post('/', deleteMessage);


module.exports = router;