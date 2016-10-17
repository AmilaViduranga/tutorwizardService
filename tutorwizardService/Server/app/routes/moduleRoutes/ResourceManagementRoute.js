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

router.get('/getresources/:id/:unitId/:catagoryId', function(req, res, next) {
    ResourceController.getResourceForCategory(req.params.id, req.params.unitId, req.params.catagoryId, res);
})

module.exports = router;