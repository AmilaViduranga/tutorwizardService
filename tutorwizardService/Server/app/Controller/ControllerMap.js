/**
 * Created by User on 9/9/2016.
 * developer: -Kasun
 * use as map for all the controllers allocating
 */
var Controllers = {};

Controllers.UserController = require('./ModuleControllers/UserController');
Controllers.SubjectController = require('./ModuleControllers/SubjectController');
Controllers.ModuleController = require('./ModuleControllers/ModuleController');
Controllers.UnitController = require('./ModuleControllers/UnitController');
Controllers.ResourceController = require('./ModuleControllers/ResourceController');

module.exports = Controllers;
