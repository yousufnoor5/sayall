const Message = require("../Models/Message");
const User = require("../Models/User");
const Send = require("../Support/Send");
const { isEmpty } = require("../Support/Validator");
const BadWords = require("../Support/BadWords");


const SendMessageController = (req, res) => {

    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let { username, msg } = req.fields;

    if (isEmpty(['username', 'msg'], req.fields)) {
        return Send(res, 400, "failed", "Invalid Request");
    }

    if(msg.length <= 15){
        return Send(res, 400, "failed", "Message is too short !");
    }

    if(msg.length > 500){
        return Send(res, 400, "failed", "Message is too long. Max characters limit : 500.");
    }


    //if msg contain bad words !
    for(const w of BadWords){
        if(msg.includes(w)){
            return Send(res, 400, "failed", "Invalid Message !");
            break;
        }
    }

    //remove word if a word contain *
    newMsg = msg.split(" ");
    msg = "";

    for(const w of newMsg){

        if(w.includes("*")){
            continue;
        }

        msg += `${w} `;
    }

    User.findOne({ username: username }, ['_id'])
        .then(e => {

            if (e) {

                const data = new Message({
                    username: username,
                    msg: msg,
                    ip: ip,
                    date : Date.now()
                });

                data.save()
                    .then(() => {
                        return Send(res, 200, "success", "Message Received");
                    })
                    .catch(err => {
                        return Send(res, 500, "failed", "Something went wrong !");
                    });

            }
            else{
                return Send(res, 404, "failed", "User not found !");
            }

        })
        .catch((err) => {
            return Send(res, 500, "failed", "Something went wrong !");
        });

   


}

module.exports = SendMessageController;