/**
 * Created by User on 16/9/2016.
 * Developer: Kasun
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');

var UserController = ControllerMap.UserController;

router.get('/validuser/:id', function(req, res, next) {
    UserController.paymentValidationService(req.params.id, res);
})

module.exports = router;