const express = require('express');
const { EditUser } = require('../../../controllers/adminusersController/adminusercontroller');
const router = express.Router()



router.route('/')
.put(EditUser)


module.exports = router;