const express = require("express");
const router = express.Router();
const {authenticateUser, authorizeUser, logout} = require('../controllers/authControllers');

router.post('/authenticate', authenticateUser);
router.get('/authorize', authorizeUser)
router.get('/logout', logout)

module.exports = router;