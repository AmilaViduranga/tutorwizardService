/**
 * Created by User on 9/9/2016.
 * developer: -Kasun
 * use as map for all the controllers allocating
 */
var Controllers = {};

//LearningZone Controllers
Controllers.UserController = require('./ModuleControllers/UserController');
Controllers.SubjectController = require('./ModuleControllers/LearningZone/SubjectController');
Controllers.ModuleController = require('./ModuleControllers/LearningZone/ModuleController');
Controllers.UnitController = require('./ModuleControllers/LearningZone/UnitController');
Controllers.ResourceController = require('./ModuleControllers/LearningZone/ResourceController');
Controllers.GlossaryController = require('./ModuleControllers/LearningZone/GlossaryController');
Controllers.FaqController = require('./ModuleControllers/LearningZone/FaqController');
Controllers.TutorChallengeController = require('./ModuleControllers/LearningZone/TutorChallengeController');
Controllers.SearchController = require('./ModuleControllers/LearningZone/SearchController');

//MyAccount Controllers
Controllers.PaymentController = require('./ModuleControllers/MyAccount/PaymentController');
Controllers.CancelSubscription = require('./ModuleControllers/MyAccount/CancelSubscriptionController');

//curriculum controllers
Controllers.CurriculumController = require('./ModuleControllers/Curriculum/CurriculumController');

//grade controllers
Controllers.GradesController = require('./ModuleControllers/Grades/GradeController');

//package controllers
Controllers.PackageController = require('./ModuleControllers/Package/PackageController');

//message controllers
Controllers.MessageController = require('./ModuleControllers/Messages/MessageController');
Controllers.MessageTypeController = require('./ModuleControllers/Messages/MessageTypeController');

//file uploader controller
Controllers.FileUploader = require('./ModuleControllers/FileUploader/FileUploaderController');

module.exports = Controllers;
