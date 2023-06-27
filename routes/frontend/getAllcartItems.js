const express = require('express')
const router = express.Router();

const {   getAllCartItems } = require('../../controllers/frontEndData');

router.get('/', getAllCartItems);

module.exports = router;