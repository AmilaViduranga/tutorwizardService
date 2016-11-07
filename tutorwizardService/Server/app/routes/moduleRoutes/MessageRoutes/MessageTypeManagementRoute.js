/**
 * Created by amila on 11/7/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var MessageTypeController = ControllerMap.MessageTypeController;

router.get('/:clientid', function(req, res, next) {
    MessageTypeController.getAllTypes(req.params.clientid, res);
});

module.exports = router;