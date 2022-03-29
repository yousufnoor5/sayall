const User = require("../Models/User");
const Send = require("../Support/Send");

const UserInfoController = (req,res) => {

    User.findOne({ username : req.session.username })
    .then(e => {

        if(e){

            return res.send({
                status : "success",
                msg : "User information",
                name : e.name,
                username : e.username,
                email : e.email,
                bio : e.bio,
                profilePic : e.profilePic,
            });
        }
        else{
            return Send(res, 404,"failed","No User Found");
        }
        
    })
    .catch((err) => {

        return Send(res, 500,"failed","Something went wrong !");

    });

}

module.exports = UserInfoController;