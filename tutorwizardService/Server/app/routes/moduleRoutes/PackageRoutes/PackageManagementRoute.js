/**
 * Created by amila on 10/26/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var PackageController = ControllerMap.PackageController;

router.put('/:clientID/:curriculumId/:gradeId', function(req, res, next) {
    PackageController.updatePackage(req.params.clientID, req.params.curriculumId, req.params.gradeId, res);
});

module.exports = router;