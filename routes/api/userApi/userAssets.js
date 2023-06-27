const express = require('express');
const router = express.Router()
const { createNewAsset, editAsset, deleteAsset } = require('../../../controllers/userController/userAssetController')

router.route('/')
.post(createNewAsset)
.put(editAsset)
// .delete(deleteAsset);




module.exports = router;