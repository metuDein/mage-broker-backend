const express = require('express');
const { EditUser, deleteUser } = require('../../../controllers/adminusersController/adminusercontroller');
const router = express.Router()



router.route('/')
.post(deleteUser);






module.exports = router;