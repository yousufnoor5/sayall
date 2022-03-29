const Constants = require("../Constants");

const AuthMiddleware = (req, res, next) => {

    const sess = req.session;

    const errMsg = {
        status : "failed",
        msg : "Login required !",
    };

    const token = req.cookies['token'];

    if (!token) {
        // "A token is required for authentication."
        return res.status(401).send(errMsg);
    }

    if(sess.loggedIn){
        return next();
    }
    else{
        return res.status(401).send(errMsg);
    }
        

};

module.exports = AuthMiddleware;