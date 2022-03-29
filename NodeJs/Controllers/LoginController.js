const User = require("../Models/User");
const Validator = require("../Support/Validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Constants = require("../Constants");
const Send = require("../Support/Send");

const LoginController = (req, res) => {

    if(req.fields == {}){
        return Send(res, 400, "failed", "Something is empty !");
    }

    //if something is empty
    const isEmpty = Validator.isEmpty(['username', 'password'], req.fields);

    if(isEmpty){
        return Send(res, 400, "failed", "Something is empty !");
    }
    
    User.findOne({ username : req.fields.username })
    .then(e => {

        if (e) {

            //comparing pass if correct !
            bcrypt.compare(req.fields.password, e.password, function(err, result) {

                if(result){

                   // const loginToken = jwt.sign({ data: {name : e.name, email : e.email} }, Constants.secret, { expiresIn: Constants.expireTime });

                    req.session.username = e.username;
                    req.session.loggedIn = true;

                    return res.send({
                        status : "login success",
                        msg : "Login Successful",
                        name : e.name,
                       // email : e.email,
                        username : e.username,
                        //token : loginToken
                    });

                   
                }
                else{

                    return Send(res, 404, "failed", "Wrong Credentials");

                }

            });

        } 
        else {

            return Send(res, 404, "failed", "Wrong Credentials");

        }

    })
    .catch(err => {
        return Send(res, 500, "failed", "Something went wrong !");
    });

}

module.exports = LoginController;