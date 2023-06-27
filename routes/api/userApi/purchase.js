const express = require('express');
const { completePurchase } = require('../../../controllers/userController/purchasecontroller');
const router = express.Router()


router.post('/', completePurchase)



module.exports = router;