/**
 * Created by amila on 10/14/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var FaqController = ControllerMap.FaqController;

router.get('/:id/:unitId', function(req, res, next) {
    FaqController.getAllFaq(req.params.id, req.params.unitId, res);
});

module.exports = router;