const express = require('express')
const router = express.Router();
const path = require('path'); 
const { getAllAssets, getAsset } = require('../../controllers/frontEndData');

router.route('/')
.get(getAllAssets);

router.route('/:id')
.get(getAsset);

module.exports = router;