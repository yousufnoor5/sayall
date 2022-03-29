const htmlspecialchars = require('htmlspecialchars');

//removing html special chars
const HTMLFilterMiddleware = (req, res, next) => {
    
    if(req.fields){
        for(const i in req.fields ){
            req.fields[i] = htmlspecialchars(req.fields[i]);
        }
    }

    return next();
    
}

module.exports = HTMLFilterMiddleware;