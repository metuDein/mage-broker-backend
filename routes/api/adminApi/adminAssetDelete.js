const express = require('express');
const router = express.Router();

const { deleteAsset } = require('../../../controllers/adminAssetcontroller/adminDeleteAsset')



router.post('/', deleteAsset)


// .delete(deleteAsset);




module.exports = router;