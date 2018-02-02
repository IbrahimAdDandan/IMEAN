var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.controller');

router
    .route('/login')
    .post(ctrlUsers.login);

router
    .route('/users/register')
    .post(ctrlUsers.register);

module.exports = router;