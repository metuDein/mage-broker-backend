const express = require('express');
const router = express.Router()
const { createNewAsset, editAsset, deleteAsset } = require('../../../controllers/userController/userAssetController')

router.post('/', deleteAsset)



module.exports = router;