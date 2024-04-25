const express = require('express');
const { createUser, testUser, getAllUsers } = require('../apps/users/user.controller');

const router = express.Router();

// router.get('/', testUser)
router.get('/', getAllUsers)
router.post('/user', createUser)

module.exports = router