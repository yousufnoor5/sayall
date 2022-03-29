const Constants = {

    mongoDBAddress : "mongodb://localhost:27017/yourdb",

    //secret key for session !
    secret : "secretKey",

    //user session jwt token expire time
    expireTime : "48h",

    //frontend url without end forward slash / ! ex https://google.com
    frontendUrl : "http://localhost:3002",
    
}

module.exports = Constants;