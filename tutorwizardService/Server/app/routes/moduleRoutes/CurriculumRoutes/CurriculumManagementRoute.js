/**
 * Created by amila on 10/26/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var CurriculumController = ControllerMap.CurriculumController;

router.get('/', function(req, res, next) {
    CurriculumController.getCurriculums(res);
});

module.exports = router;