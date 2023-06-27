const express = require('express');
const router = express.Router(); 
const { handleAddMore } = require('../../controllers/AuthEmailController');


router.patch('/', handleAddMore);

module.exports = router;