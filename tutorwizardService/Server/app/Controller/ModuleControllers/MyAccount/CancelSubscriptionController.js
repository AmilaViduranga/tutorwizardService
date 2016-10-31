/**
 * Created by amila on 10/26/16.
 */
var Connection = require('../../../models/Connection');
var User = require('./../UserController');

function CancelSubscriptionController() {
    this.getReasons = function(clientId, res) {
        return User.validateUser(clientId, function(result) {
            if (result) {
                return Connection.query('SELECT * FROM `cancel_subscriptions`', { type: Connection.QueryTypes.SELECT}).then(function(data) {
                    if (!data==0) {
                        return res.send({'status': 200, 'reasons': data});
                    } else {
                        return res.send({'status': 500, 'message': 'no reasons available right now'});
                    }
                });
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    this.createCancelSubscription = function(clientId, reasonId, reason, res) {
        return User.validateUser(clientId, function(result) {
            if(result) {
                return Connection.query('INSERT INTO `cancel_subscription_others`(`student_id`, `cancel_subscription_id`, `text`) VALUES('+clientId+','+reasonId+','+reason+')').then(function(status) {
                    return res.send(status);
                });
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }
}

module.exports = new CancelSubscriptionController();