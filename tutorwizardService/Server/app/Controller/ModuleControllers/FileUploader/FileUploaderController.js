/**
 * Created by EDI-DELL-01 on 11/10/2016.
 */
var Connection = require('../../../models/Connection');
var User = require('./../UserController');

function FileUploaderController() {
    this.profileUploader = function (clientID, profile, res) {
        return User.validateUser(clientID, function(result) {
            if(result) {
                return profile.mv('Uploads/Profile/'+clientID+'.jpg', function(err) {
                    return Connection.query('UPDATE users SET `image`="Profile/'+clientID+'.jpg" where id='+clientID+'').then(function(data) {
                        if(data) {
                            return res.send({'status': 200, 'message': 'successfully updated'});
                        } else {
                            return res.send({'status': 500, 'message': 'server not update image properly'});
                        }
                    });
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    this.getProfile = function(clientId, res) {
        return User.validateUser(clientId, function(result) {
            if(result) {
                return Connection.query('SELECT image FROM users WHERE id='+clientId+'', { type: Connection.QueryTypes.SELECT}).then(function (data) {
                    if(!data.length == 0) {
                        data.forEach(function (item) {
                            if(item.image) {
                                return res.send({'status': 200, 'imagepath': item.image});
                            } else {
                                return res.send({'status' : 500, 'imagepath': 'Profile/default.jpg'});
                            }
                        })
                    } else {
                        return res.send({'status': 404, 'message': 'there is an error on server, please try again'});
                    }
                })
            }
        })
    }
}

module.exports = new FileUploaderController();