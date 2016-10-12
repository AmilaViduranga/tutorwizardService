/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */

 
var express = require('express');
var router = express.Router();

var UserManagementRoute = require('./moduleRoutes/userManagement/UserManagementRoute');
var FoodManagementRoute = require('./moduleRoutes/FoodManagement/FoodManagementRoute');
var OrderManagementRoute = require('./moduleRoutes/orderManagement/OrderManagementRoute');

router.use('/user-management/', UserManagementRoute);
router.use('/food-management/', FoodManagementRoute);
router.use('/order-management/', OrderManagementRoute);

module.exports = router;
