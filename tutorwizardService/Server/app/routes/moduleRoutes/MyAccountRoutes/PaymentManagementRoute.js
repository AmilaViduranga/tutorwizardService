/**
 * Created by amila on 10/24/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var PaymentController = ControllerMap.PaymentController;

router.get('/:id', function(req, res, next) {
    PaymentController.getPaymentInfo(req.params.id, res);
});

router.get('/history/:id', function(req, res, next) {
    PaymentController.getTransactionActions(req.params.id, res);
});

module.exports = router;