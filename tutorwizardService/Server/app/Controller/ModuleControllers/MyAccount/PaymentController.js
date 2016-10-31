/**
 * Created by amila on 10/24/16.
 */
var Connection = require('../../../models/Connection');
var User = require('./../UserController');

function paymentontroller() {
    this.getPaymentInfo = function(clientId, res) {
        var basicInfo = {};
        return User.isUserStudent(clientId, function(data) {
            if(data) {
                return User.getGrade(clientId, function(response) {
                    if(response) {
                        basicInfo.gradeName = response[0];
                        return User.getBasicStudentDetails(clientId, function(response) {
                            basicInfo.otherDetails = response[0][0];
                            return Connection.query(' SELECT t.name, p.next_payment_date, pack.monthly_price, pack.termly_price, pack.yearly_price, pack.price '+
                            'from student_packages s, payments p, payment_terms t, payees pay, packages pack '+
                            'where s.payment_term = p.id and s.payment_term = t.id and pay.student_id=s.student_id and pack.id=s.package_id and s.student_id='+clientId, { type: Connection.QueryTypes.SELECT}
                            ).then(function(data) {
                                basicInfo.paymentTerm = data[0].name;
                                basicInfo.monthlyPrice = data[0].monthly_price;
                                basicInfo.termlyPrice = data[0].termly_price;
                                basicInfo.yearlyPrice = data[0].yearly_price;
                                basicInfo.price = data[0].price;
                                return res.send({"status":200, 'Info': basicInfo});
                            })
                        })
                    }
                })
            } else {
                return ({'status': 404, 'message': 'user is not a student'});
            }
        })
    }

    this.getTransactionActions = function(clientId, res) {
        return Connection.query("SELECT p.created, p.amount_paid, m.name, p.invoice "+
        "FROM payments p, payment_methods m "+
        "where p.students_id = "+clientId+" and m.id = p.payment_methods_id", { type: Connection.QueryTypes.SELECT}). then(function(history) {
            if(!history.length == 0) {
                return res.send({'status':200, 'history': history});
            } else {
                return res.send({'status':500, 'message': 'no payment history recorded'});
            }
        });
    }


}

module.exports = new paymentontroller();