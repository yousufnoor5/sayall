const User = require("../Models/User");
const Validator = require("../Support/Validator");
const Send = require("../Support/Send");
const fs = require("fs");
path = require('path')
// const formidable = require('express-formidable');

const UpdateUserInfo = (req, res) => {

    // console.log(req.fields);
    // return;

    if (Validator.isEmpty(['email', 'name'], req.fields)) {
        return Send(res, 400, "failed", "Something is empty !");
    }

    if (!Validator.isEmail(req.fields.email)) {
        return Send(res, 400, "failed", "Invalid email !");
    }

    //getting data
    const { name, email, bio} = req.fields;
    let imgName = "";
    const maxFileSize = 10000000; //bytes = 10mb

    if(bio.length > 300){
        return Send(res, 400, "failed", "Bio is too long !");
    }

    if (req.fields.imgName != null && !req.fields.imgName.match(/^.*\.(jpg|gif|GIF|png|jpeg|bmp|webp)$/i)) {
        return Send(res, 400, "failed", "Image Format is invalid !");
    }    

    if(req.files.img && req.fields.imgName){

        if(req.files.img.size > maxFileSize){
            return Send(res, 414, "failed", "Image is too large !");
        }

        const { img } = req.files;
        const fileFormat = img.name.match(/(?<=\.).*/i);
        fs.writeFileSync(`${path.join(__dirname, '../images/')}${req.session.username}.${fileFormat[0]}`, fs.readFileSync(img.path));
        
        //setting image name for db
        imgName = `${req.session.username}.${fileFormat[0]}`;
    }
    else{
        imgName = null;
    }

    //saving db
    if (imgName != null) {

        User.updateOne({ username: req.session.username }, {
            name: name,
            email: email,
            bio: bio,
            profilePic: imgName,
        })
            .then((e) => {

                if (e) {
                    return Send(res, 200, "success", "Successfully updated !");
                }
                else {
                    return Send(res, 500, "failed", "Something went wrong !");
                }

            })
            .catch((err) => {

                return Send(res, 500, "failed", "Something went wrong !");
            })

    }
    else {

        User.updateOne({ username: req.session.username }, {
            name: name,
            email: email,
            bio: bio
        })
            .then((e) => {

                if (e) {
                    return Send(res, 200, "success", "Successfully updated !");
                }
                else {
                    return Send(res, 500, "failed", "Something went wrong !");
                }

            })
            .catch((err) => {

                return Send(res, 500, "failed", "Something went wrong !");
            });

    }
}

module.exports = UpdateUserInfo;