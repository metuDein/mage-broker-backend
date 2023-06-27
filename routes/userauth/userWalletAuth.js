const express = require('express');
const router = express.Router(); 
const { authWallet } = require('../../controllers/walletController');



router.post('/', authWallet);

module.exports = router;