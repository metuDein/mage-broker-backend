const express = require('express')
const router = express.Router();
const path = require('path'); 
const { getAlltrendingAssets } = require('../../controllers/frontEndData');

router.get('/', getAlltrendingAssets);

module.exports = router;

