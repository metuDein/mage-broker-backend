const express = require('express');
const { createCashier } = require('../../../controllers/userController/cashierController');

const router = express.Router()


router.post('/', createCashier)



module.exports = router;