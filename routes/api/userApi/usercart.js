const express = require('express');
const router = express.Router()
const { addToCart } = require('../../../controllers/userController/userCartController');




router.post('/', addToCart);


module.exports = router;