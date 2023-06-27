const express = require('express')
const router = express.Router();
const path = require('path'); 
const {  getHompageData } = require('../../controllers/frontEndData');

router.get('/', getHompageData);

module.exports = router;