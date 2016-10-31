/**
 * Created by amila on 10/13/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var ModuleController = ControllerMap.ModuleController;

router.get('/:id/:subjectId', function(req, res, next) {
    ModuleController.get(req.params.id, req.params.subjectId, res);
});

module.exports = router;