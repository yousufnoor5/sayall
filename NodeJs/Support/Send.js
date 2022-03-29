const Send = (res, httpCode, status,msg) => {

    res.status(httpCode).send({
        status : status,
        msg : msg
    });
}

module.exports = Send;