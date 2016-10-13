/**
 * Created by amila on 10/13/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');

var ResourceController = ControllerMap.ResourceController;

router.get('/available/:id/:unitId', function(req, res, next) {
    ResourceController.availableResource(req.params.id, req.params.unitId, res);
});

module.exports = router;