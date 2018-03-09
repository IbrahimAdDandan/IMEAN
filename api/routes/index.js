var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.controller');
var ctrlPages = require('../controllers/pages.controller');

router
    .route('/login')
    .post(ctrlUsers.login);

router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/page')
    .get(ctrlPages.getPages)
    .post(ctrlUsers.authenticate, ctrlPages.addPage);

router
    .route('/page/:pageId')
    .get(ctrlPages.getOne)
    .post(ctrlUsers.authenticate, ctrlPages.addChild)
    .delete(ctrlUsers.authenticate, ctrlPages.deletePage)
    .put(ctrlUsers.authenticate, ctrlPages.updatePage);

router
    .route('/page/:pageId/subpage/:spId')
    .get(ctrlPages.getOneSubpage)
    .delete(ctrlUsers.authenticate, ctrlPages.deleteSubPage)
    .put(ctrlUsers.authenticate, ctrlPages.updateSubPage);

module.exports = router;