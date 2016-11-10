/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */
var express = require('express');
var router = express.Router();

//learningzone routes importing
var UserManagementRoute = require('./moduleRoutes/UserManagementRoute');
var SubjectManagementRoute = require('./moduleRoutes/LearningZoneRoutes/SubjectManagementRoute');
var ModuleManagementRoute = require('./moduleRoutes/LearningZoneRoutes/ModuleManagementRoute');
var UnitManagementRoute = require('./moduleRoutes/LearningZoneRoutes/UnitManagementRoute');
var ResourceManagementRoute = require('./moduleRoutes/LearningZoneRoutes/ResourceManagementRoute');
var GlossaryManagementRoute = require('./moduleRoutes/LearningZoneRoutes/GlossaryManagementRoute');
var FaqManagementRoute = require('./moduleRoutes/LearningZoneRoutes/FaqManagementRoute');
var TutorChallengeManagementRoute = require('./moduleRoutes/LearningZoneRoutes/TutorchallengeManagementRoute');
var SearchManagementRoute = require('./moduleRoutes/LearningZoneRoutes/SearchManagementRoute');

//payment routes importing
var PaymentManagementRoute = require('./moduleRoutes/MyAccountRoutes/PaymentManagementRoute');
var CancelManagementRoute = require('./moduleRoutes/MyAccountRoutes/CancelManagementRoute');

//curriculum routes importing
var CurriculumManagementRoute = require('./moduleRoutes/CurriculumRoutes/CurriculumManagementRoute');

//grade routes importing
var GradeManagementRoute = require('./moduleRoutes/GradesRoutes/GradeManagementRoute');

//package route importing
var PackageManagementRoute = require('./moduleRoutes/PackageRoutes/PackageManagementRoute');

//message route importing
var MessageManagementRoute = require('./moduleRoutes/MessageRoutes/MessageManagementRoute');
var MessageManagementTypeRoute = require('./moduleRoutes/MessageRoutes/MessageTypeManagementRoute');

//file uplading route importing
var FileUploaderManagementRoute = require('./moduleRoutes/FileUploaderRoutes/FileUploaderManagementRoute');

//LearningZone Routes registering
router.use('/user/', UserManagementRoute);
router.use('/subject/', SubjectManagementRoute);
router.use('/module/', ModuleManagementRoute);
router.use('/unit/', UnitManagementRoute);
router.use('/resource/', ResourceManagementRoute);
router.use('/glossary/', GlossaryManagementRoute);
router.use('/faq/', FaqManagementRoute);
router.use('/tutorchallenge/', TutorChallengeManagementRoute);
router.use('/search/', SearchManagementRoute);

//MyAcount Routes registering
router.use('/payment/', PaymentManagementRoute);
router.use('/cancelsubscription/', CancelManagementRoute);

//curriculum routes registering
router.use('/curriculum/', CurriculumManagementRoute);

//grade routes registering
router.use('/grades/', GradeManagementRoute);

//package routes registering
router.use('/package/', PackageManagementRoute);

//message management routes registering
router.use('/message/', MessageManagementRoute);
router.use('/messagetypes/', MessageManagementTypeRoute);

//file uploader
router.use('/filemanager/', FileUploaderManagementRoute);

module.exports = router;
