const express = require('express');
const { deleteCartItem } = require('../../../controllers/userController/userCartController');
const router = express.Router()




router.post('/', deleteCartItem);


module.exports = router;