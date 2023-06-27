const express = require('express');
const router = express.Router(); 
const { existingWalletUser } = require('../../controllers/walletController');



router.post('/', existingWalletUser);

module.exports = router;