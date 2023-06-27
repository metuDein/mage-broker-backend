const express = require('express')
const router = express.Router();

const {   getAllUsers } = require('../../controllers/frontEndData');

router.get('/', getAllUsers);

module.exports = router;