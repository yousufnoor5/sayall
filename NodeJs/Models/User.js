const mongoose = require('mongoose');
const Constants = require('../Constants');

//connect to mongoDB
mongoose.connect(Constants.mongoDBAddress , {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', 
    { 
        name: String,
        username : String,
        password : String,
        email : String,
        bio : {
            type : String,
            default : "",
        },
        profilePic : {
            type : String,
            default : ""
        },
        date : {
            type : Number,
            default : Date.now()
        }
    }
    );

module.exports = User;