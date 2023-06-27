const express = require('express')
const router = express.Router();

const {   getAllMessage } = require('../../controllers/frontEndData');

router.get('/', getAllMessage);

module.exports = router;