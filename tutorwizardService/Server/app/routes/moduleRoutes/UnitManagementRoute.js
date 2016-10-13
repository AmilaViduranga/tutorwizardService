/**
 * Created by amila on 10/13/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');

var UnitController = ControllerMap.UnitController;

router.get('/:id/:module_id', function(req, res, next) {
    UnitController.get(req.params.id, req.params.module_id, res);
});

module.exports = router;