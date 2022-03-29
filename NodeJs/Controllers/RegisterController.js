const User = require("../Models/User");
const Validator = require("../Support/Validator");
const Send = require("../Support/Send");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const notAllowedUserName = ['profile', 'about', 'sayall', 'message', 'messages', 'profiles', 'logout', 'terms', 'conditions', 'aboutus', 'settings', 'setting', 'user', 'nouser', 'nousers'];

const RegisterController = (req, res) => {

    if(req.fields == {}){
        return Send(res,400,"failed", "Something is empty");
    }

    //if something is emty
    const isEmpty = Validator.isEmpty(['name', 'username', 'email', 'password'], req.fields);

    //if not email
    const isEmail = Validator.isEmail(req.fields.email);

    if(isEmpty){
        return Send(res,400,"failed", "Please fill all the fields !");
    }
    else if(!isEmail){
        return Send(res,400,"failed", "Please input a valid email !");
    }
    else if(!Validator.isSpecialCharsOk(req.fields.username)){
        return Send(res,400,"failed", "Username can only contain letters and underscore.");
    }
    else if(req.fields.username.length <= 4){
        return Send(res,400,"failed", "Username should be longer than 4 characters.");
    }
    else if(req.fields.username.length > 15){
        return Send(res,400,"failed", "Username should not be more than 15 characters.");
    }
    else if(notAllowedUserName.includes(req.fields.username)){
        return Send(res,400,"failed", "Invalid username.");
    }


    //reg user with async func
    const registerUser = async () => {

        const sameUsername = await User.findOne({ username : req.fields.username});

        //if same username exist
        if(sameUsername){
            return Send(res, 409, "failed", "Username already exist !");
        }

        const sameEmail = await User.findOne({ email : req.fields.email});

        //is same email exist
        if(sameEmail){
            return Send(res, 409, "failed", "Email already exist !");
        }

        //if user is unique save data.
        bcrypt.hash(req.fields.password, saltRounds, function(err, hash) {

            const data = new User({
                name : req.fields.name,
                username : req.fields.username,
                password: hash,
                email : req.fields.email,
            });
        
            data.save()
            .then(() => {
                return Send(res, 200, "reg success", "Registration Successful !");
            })
            .catch(err => {
                return Send(res, 500, "failed", "Something went wrong !");
            });

        });

    };

    registerUser();

    

}

module.exports = RegisterController;