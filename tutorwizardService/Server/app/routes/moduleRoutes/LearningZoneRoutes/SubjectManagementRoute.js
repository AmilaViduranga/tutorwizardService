/**
 * Created by amila on 10/12/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var SubjectController = ControllerMap.SubjectController;

router.get('/:id', function(req, res, next) {
    SubjectController.get(req.params.id, res);
});

module.exports = router;