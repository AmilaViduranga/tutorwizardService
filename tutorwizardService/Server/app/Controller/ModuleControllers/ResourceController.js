/**
 * Created by amila on 10/13/16.
 */
var Connection = require('../../models/Connection');
var User = require('./UserController');

function ResourceController() {
    this.availableResource = function(studentId, unitId, res) {
        User.validateUser(studentId, function(result) {
           if(result) {
               return getAvailableResourceCatagories(unitId, function(data) {
                   if(data) {
                       return res.send({'status':200, 'categories':data});
                   } else {
                       return res.send({'status': 500, 'message': 'not available resources for this catagory'});
                   }
               })
           } else {
               return res.send({'status': 404,'message':'permission denied'});
           }
        });
    }

    function getAvailableResourceCatagories(unitId, callback) {
        Connection.query('SELECT c.id, c.name '+
        'from resources r, resource_categorys c, resources_map_curriculums m '+
        'where m.unit_id='+unitId+' and c.id=r.category_id and r.id=m.resource_id '+
        'GROUP BY c.id', { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(data) {
                return callback(data);
            } else {
                return callback(false);
            }
        })
    }
}

module.exports = new ResourceController();