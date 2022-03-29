const Message = require("../Models/Message");
const Send = require("../Support/Send");
const ServerError = require("../Support/ServerError");
const Validator = require("../Support/Validator");

const MessageListController = (req, res) => {

    if(!req.query.pg){
        return Send(res,400,"failed", "Page number is empty !");
    }
    else if(!Validator.isNumeric(req.query.pg)){
        return Send(res,400,"failed", "Invalid Page Number");
    }

    const itemsPerPage = 10;
    const page = req.query.pg;
    const offset = (page - 1) * itemsPerPage + 1;

    const data = [];    

    Message.find({username : req.session.username}, ['msg', 'date', "_id"])
    .sort({_id : -1})
    .skip(offset - 1)
    .limit(itemsPerPage)
    .then((e) => {

        res.send({
            status : "success",
            msg : "Messages",
            messages : e,
        });
    })
    .catch((err) => {
      return ServerError(res);
    });

}

module.exports = MessageListController;