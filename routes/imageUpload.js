const express = require('express');
const { imageUpload } = require('../controllers/imageUplaodtest');
const router = express.Router();

router.post('/',  imageUpload);


module.exports = router