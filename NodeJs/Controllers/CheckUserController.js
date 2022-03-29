const User = require("../Models/User");
const Send = require("../Support/Send");

const CheckUserController = (req, res) => {

    const {username} = req.params;

    User.findOne({ username :  username}, ['name', 'profilePic','bio','-_id'])
    .then(e => {

        if(e){

            return res.send({
                status : "success",
                msg : "User Exist",
                name : e.name,
                profileImg : e.profilePic,
                bio : e.bio
            });

        }else{
            return Send(res, 404,"failed","No User Found !");
        }

    })
    .catch((err) => {

        return Send(res, 500,"failed","Something went wrong !");

    });
}

module.exports = CheckUserController;