/**
 * Created by amila on 10/26/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var CancelManagementRoute = ControllerMap.CancelSubscription;

router.get('/:id', function(req, res, next) {
    CancelManagementRoute.getReasons(req.params.id, res);
});

router.post('/cancel/:id', function(req, res, next) {
    CancelManagementRoute.createCancelSubscription(req.params.id, req.body.reasonId, req.body.reason, res);
});

module.exports = router;