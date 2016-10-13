/**
 * Created by User on 9/18/2016.
 * Developer :- Amila
 */
var Connection = require('../../models/Connection');

function UserController() {
    /*
     * check if the valid user make the request
     * @ client id:- id of the client
     * @ callback :- callback method to return value
     */
    this.validateUser = function(clientId, callback) {
        Connection.query('SELECT `status` FROM `users` WHERE id='+clientId,{ type: Connection.QueryTypes.SELECT}).then(function(data) {
            if (data[0]['status'] == 1) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

}

module.exports = new UserController();