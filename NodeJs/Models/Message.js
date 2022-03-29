const mongoose = require('mongoose');
const Constants = require('../Constants');

//connect to mongoDB
mongoose.connect(Constants.mongoDBAddress , {useNewUrlParser: true, useUnifiedTopology: true});

const Message = mongoose.model('Message', 
    { 
        username: String,
        msg : String,
        ip : String,
        date : {
            type : Number,
            default : Date.now()
        }
    }
    );

module.exports = Message;