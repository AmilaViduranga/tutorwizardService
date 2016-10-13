/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */

 
var express = require('express');
var router = express.Router();

var UserManagementRoute = require('./moduleRoutes/UserManagementRoute');
var SubjectManagementRoute = require('./moduleRoutes/SubjectManagementRoute');
var ModuleManagementRoute = require('./moduleRoutes/ModuleManagementRoute');
var UnitManagementRoute = require('./moduleRoutes/UnitManagementRoute');
var ResourceManagementRoute = require('./moduleRoutes/ResourceManagementRoute');

router.use('/user-management/', UserManagementRoute);
router.use('/subject/', SubjectManagementRoute);
router.use('/module/', ModuleManagementRoute);
router.use('/unit/', UnitManagementRoute);
router.use('/resource/', ResourceManagementRoute);

module.exports = router;
