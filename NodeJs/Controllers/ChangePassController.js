const User = require("../Models/User");
const Send = require("../Support/Send");
const Validator = require("../Support/Validator");
const bcrypt = require('bcrypt');
const ServerError = require("../Support/ServerError");
const saltRounds = 10;

const ChangePassController = (req, res) => {

    if(Validator.isEmpty(['currpass' , 'newpass' , 'confirmpass'], req.fields)){
        return Send(res,400, "failed" , "Something is empty !");
    }

    const {currpass, newpass, confirmpass} = req.fields;

    if(newpass !== confirmpass){
        return Send(res,400, "failed" , "Confirm password is not correct !");
    }
    else if(currpass === newpass){
        return Send(res,400, "failed" , "Current and new password should not be same.");
    }

    User.findOne({ username : req.session.username })
    .then(e => {

        if (e) {

            //comparing pass if correct !
            bcrypt.compare(currpass, e.password, function(err, result) {

                if(result){

                    bcrypt.hash(newpass, saltRounds, function(err, hash) {

                        User.updateOne({username : req.session.username } , {
                            password : hash,
                        })
                        .then((e) => {
                            return Send(res, 200, "success","Password has been changed.");
                        })
                        .catch((e) => {
                            return ServerError(res);
                        });

                    });
                   
                }
                else{
                    return Send(res, 200, "failed" , "Current password is wrong.");
                }
            });
        }
        else{
            return ServerError(res);
        }
    })
    .catch((err) => {
        return ServerError(res);
    });
            
}

module.exports = ChangePassController;